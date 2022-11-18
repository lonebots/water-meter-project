const User = require("../schemas/User");
const Billing = require("../schemas/Billing");
const asyncHandler = require("../middlewares/async");
const ErrorResponce = require("../utils/ErrorResponce");
const Muncipality = require("../schemas/Muncipality");

exports.payBill = asyncHandler(async (req, res, next) => {
  const billing = await Billing.update(
    { status: "paid", due: 0 },
    {
      where: { fk_consumerId: req.body.consumerNumber },
      order: [["updatedAt", "DESC"]],
    }
  );
  if (!billing) {
    return next(new ErrorResponce("Bill payment is not updated", 404));
  }

  res.status(200).json({
    success: true,
    message: "Payment is Updated",
  });
});

exports.generateBill = asyncHandler(async (req, res, next) => {
  const result = await Muncipality.findAll();

  for (let i = 0; i < result.length; i++) {
    let updateContent = {
      currentThreshold: result[i].dataValues.currentMeterReading,
    };
    await User.update(updateContent, {
      where: { consumerNumber: result[i].dataValues.fk_consumerId },
    });
    let due = 0;
    let fine = 0;
    const previousBilling = await Billing.findOne({
      where: { fk_consumerId: result[i].dataValues.fk_consumerId },
      order: [["updatedAt", "DESC"]],
    });
    if (!previousBilling) {
      due = 0;
      fine = 0;
    } else {
      if (previousBilling.status === "unpaid") {
        due = previousBilling.totalCost;
        fine = previousBilling.fine + 5;
      } else {
        due = 0;
        fine = 0;
      }
    }
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const consumedPrice = parseInt(result[i].dataValues.currentMonthlyPrice);
    const totalCost = consumedPrice + due + fine;
    const date = new Date();
    const monthYear = monthNames[date.getMonth()] + "/" + date.getFullYear();
    const billing = await Billing.create({
      fk_consumerId: result[i].dataValues.fk_consumerId,
      consumedPrice: consumedPrice,
      totalCost: totalCost,
      monthYear: monthYear,
      due: due,
      fine: fine,
    });
    if (!billing) {
      return next(new ErrorResponce("Billing is not created", 404));
    }
  }

  res.status(200).json({
    success: true,
    message: "The billings are updated",
  });
});

exports.getMyBill = asyncHandler(async (req, res, next) => {
  const bill = await Billing.findOne({
    where: { fk_consumerId: req.user.consumerNumber },
    order: [["createdAt", "DESC"]],
  });
  if (!bill) {
    return next(new ErrorResponce("No such bill is not found", 404));
  }

  res.status(200).json({
    success: true,
    bill,
  });
});

//Getting all bills
exports.getMyAllBill = asyncHandler(async (req, res, next) => {
  const bill = await Billing.findAll({
    where: { fk_consumerId: req.user.consumerNumber },
    order: [["createdAt", "DESC"]],
  });
  if (!bill) {
    return next(new ErrorResponce("No such bill is not found", 404));
  }

  res.status(200).json({
    success: true,
    bill,
  });
});

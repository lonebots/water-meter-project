const User = require("../schemas/User");
const Price = require("../schemas/Price");
const asyncHandler = require("../middlewares/async");
const ErrorResponce = require("../utils/ErrorResponce");
const Muncipality = require("../schemas/Muncipality");
const bcrypt = require("bcryptjs");

//USER & ADMIN

//@desc Create user
//@router POST /api/user
//@access Public
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, password, consumerNumber, currentThreshold, phoneNumber } =
    req.body;

  const role = "user";

  //Create a User
  const user = await User.create({
    name,
    consumerNumber,
    password,
    role,
    currentThreshold,
    phoneNumber,
  });

  if (!user) {
    return next(new ErrorResponce(`Entered invalid entry`, 404));
  }
  sendbackCookie(200, res, user);
});

//@desc Login User
//@router GET /api/user/login
//@access Private
exports.login = asyncHandler(async (req, res, next) => {
  const { consumerNumber, password } = req.body;
  const status = "active";

  //Checking basic validation for email and password
  if (!consumerNumber || !password) {
    return next(
      new ErrorResponce("Please enter a consumerNumber and a password :", 400)
    );
  }

  //Checking for user in db
  const user = await User.findByPk(consumerNumber);

  if (!user) {
    return next(new ErrorResponce("Invalid credientials", 401));
  }

  //Match passwords
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponce("Invalid credientials", 401));
  }
  const currentdate = new Date();
  await User.update(
    {
      status: status,
      lastLogin:
        currentdate.getDate() +
        "/" +
        (currentdate.getMonth() + 1) +
        "/" +
        currentdate.getFullYear() +
        " @ " +
        currentdate.getHours() +
        ":" +
        currentdate.getMinutes() +
        ":" +
        currentdate.getSeconds(),
    },
    { where: { consumerNumber: consumerNumber } }
  );
  sendbackCookie(200, res, user);
});

//@desc Current User
//@router GET /api/user/me
//@access Private
exports.getMe = asyncHandler(async (req, res, next) => {
  console.log(req.user.consumerNumber);
  const user = await User.findByPk(req.user.consumerNumber);
  //console.log(user)

  if (!user) {
    return next(new ErrorResponce(`Some error has Occured`, 404));
  }
  res.status(200).json({
    success: true,
    user,
  });
});

//@desc logout User
//@router GET /api/v1/user/logout
//@access Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  const status = "inactive";
  await User.update(
    { status },
    { where: { consumerNumber: req.user.consumerNumber } }
  );

  res.status(200).json({ success: true, data: {} });
});

//@desc Update Details
//@router PUT /api/user/updatedetails
//@access Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
  let updateContent = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
  };

  const user = await User.update(updateContent, {
    where: { consumerNumber: req.user.consumerNumber },
  });

  if (!user) {
    return next(new ErrorResponce(`Some error has Occured`, 404));
  }
  res.status(200).json({
    success: true,
    user,
  });
});

//@desc Change rate
//@router POST /api/user
//@access Private
exports.changeRate = asyncHandler(async (req, res, next) => {
  const { currentPrice, quantity } = req.body;
  const price = await Price.create({ currentPrice, quantity });

  if (!price) {
    return next(new ErrorResponce("Price cannot be null", 401));
  }

  res.status(200).json({
    success: true,
    price,
  });
});

//@desc Get single user meter data
//@router POST /api/munci
//@access Private
exports.getDetails = asyncHandler(async (req, res, next) => {
  const id = req.user.consumerNumber;
  const muncipality = await Muncipality.findOne({
    where: { fk_consumerId: id },
    order: [["updatedAt", "DESC"]],
  });

  if (!muncipality) {
    return next(new ErrorResponce("Given user data is not available", 404));
  }
  const { currentWaterConsumption, currentMonthlyPrice, lastUpdate } =
    muncipality;

  res.status(200).json({
    success: true,
    currentWaterConsumption,
    currentMonthlyPrice,
    lastUpdate,
  });
});

//Changing default password
exports.changePassword = asyncHandler(async (req, res, next) => {
  const consumerNumber = req.user.consumerNumber;
  const { oldPassword, newPassword } = req.body;
  const user = await User.findByPk(consumerNumber);
  const isMatch = await user.matchPassword(oldPassword);
  if (!isMatch) {
    return next(new ErrorResponce("Invalid old password", 401));
  }
  const salt = await bcrypt.genSalt(10);
  const checkNewPassword = await bcrypt.hash(newPassword, salt);
  const updateContent = { password: checkNewPassword };
  const userUpdate = await User.update(updateContent, {
    where: { consumerNumber },
  });
  if (!userUpdate) {
    return next(new ErrorResponce("Password cannot be null", 401));
  }
  res.status(200).json({ success: true, data: {} });
});

//Create a cookie from create user and login
const sendbackCookie = (statusCode, res, user) => {
  //Creating jwt web token
  const token = user.jwtWebToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: false,
    secure: false,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};

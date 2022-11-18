const User = require("../schemas/User");

const checkDuplicateConsumerNumber = (req, res, next) => {
  // Consumer Number checking
  User.findOne({
    where: {
      consumerNumber: req.body.consumerNumber,
    },
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Consumer Number already in use!",
      });
      return;
    }

    next();
  });
};
module.exports = checkDuplicateConsumerNumber;

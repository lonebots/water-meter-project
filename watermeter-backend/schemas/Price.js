const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Price = sequelize.define("price", {
  currentPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Price;

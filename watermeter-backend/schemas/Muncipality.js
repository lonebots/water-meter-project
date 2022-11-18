const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Price = require("./Price");
const User = require("./User");

const Muncipality = sequelize.define("muncipality", {
  currentWaterConsumption: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  currentMonthlyPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  currentMeterReading: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  fk_consumerId: {
    type: DataTypes.INTEGER(8),
    allowNull: false,
    references: {
      model: User,
      key: "consumerNumber",
    },
  },
  priceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Price,
      key: "id",
    },
  },
  lastUpdate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
module.exports = Muncipality;

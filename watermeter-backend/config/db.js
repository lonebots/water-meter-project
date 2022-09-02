const {Sequelize} =require("sequelize");
const dbconfig=require('./dbconfig')

const sequelize = new Sequelize(dbconfig.DB, dbconfig.USER, dbconfig.PASSWORD, {
    host: dbconfig.HOST,
    dialect: dbconfig.dialect,
    operatorsAliases: '0',
  logging:false});



module.exports=sequelize;



const {DataTypes}=require('sequelize');
const sequelize=require('../config/db');
const User=require('./User');

const Billing=sequelize.define('billing',{
    fk_consumerId:{
        type:DataTypes.INTEGER(8),
        allowNull:false,
        references:{
            model:User,
            key:'consumerNumber',
        }
    },
    consumedPrice:{
        type:DataTypes.DECIMAL(10,2),
        allowNull:false
    },
    due:{
        type:DataTypes.DECIMAL(10,2),
        allowNull:false,
        defaultValue:0
    },
    fine:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0
    },
    totalCost:{
        type:DataTypes.DECIMAL(10,2),
        allowNull:false
    },
    monthYear:{
        type:DataTypes.STRING,
        allowNull:false
    },
    status:{
        type:DataTypes.ENUM,
        values: ['paid','unpaid'],
        defaultValue:'unpaid'
    }


});

module.exports=Billing;


// module.exports=sequelizeDao
const Sequelize = require('sequelize');
const sequelize = require("../config/dbconfig");

const sequelizeDao = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,     //主键
    autoIncrement: true,   //自增长
    allowNull: false      //是都允许为空
    // defaultValue:DataTypes.UUIDV1
  },
  year: {
    type: Sequelize.DATE ,
    allowNull: false  
  },
  name: {
    type: Sequelize.STRING(20),
    allowNull: false           
  },
  sex: {
    type: Sequelize.INTEGER ,
    allowNull: false        
  },
  position: {
    type: Sequelize.STRING(10),
    allowNull: false            
  },
  Jurisdiction: {
    type: Sequelize.STRING(10),
    allowNull: false           
  },
  Blacklist: {
    type: Sequelize.STRING(1),
    allowNull: false           
  },
}, {
    freezeTableName: true ,    //禁用修改表名
    timestamps: false,
    tableName:'users'

  });


module.exports = sequelizeDao
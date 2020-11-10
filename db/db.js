const {Sequelize, DataTypes, Model} = require('sequelize')

const sequelize = new Sequelize("therestaurantdb", "root", "Root1234", {
    dialect: "mysql",
    host: "localhost"
});

class User extends Model {}

User.init({
    // Model attributes are defined here
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    }
  }, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'User' // We need to choose the model name
  });

  sequelize.sync()
  
  module.exports={
      User
  }
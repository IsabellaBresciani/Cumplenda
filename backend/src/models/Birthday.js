const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db'); 

class Birthday extends Model {}

Birthday.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING(45), 
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(45),
      allowNull: true, 
    },

    birthday_date: {
      type: DataTypes.DATEONLY, 
      allowNull: false,
    },
    notify: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, 
      allowNull: false,
    },
    notes: {
      type: DataTypes.STRING(200),
      allowNull: true,
    }
  },
  {
    sequelize,
    modelName: 'Birthday',
    tableName: 'birthdays',
    timestamps: true,   
    underscored: true 
  }
);


const User = require('./User');

Birthday.belongsTo(User, {
   foreignKey: 'user_id',
   onDelete: 'CASCADE' });

User.hasMany(Birthday, {
  foreignKey: 'user_id'
});


module.exports = Birthday;
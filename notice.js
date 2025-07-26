const { DataTypes } = require('sequelize');
const sequelize = require('./db'); 

const Notice = sequelize.define('Notice', {
  content: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Notice;

const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Hash password before creating user
User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
});

// Instance method for password check
User.prototype.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = User;
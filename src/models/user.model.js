const {DataTypes} = require('sequelize');
const {sequelize} = require('../config/db');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.STRING(36),
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('ADMIN','SUPER_ADMIN'),
        allowNull: false,
        defaultValue: 'ADMIN',
    },
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: true
    },
    tokenVersion: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    }
});

User.beforeCreate(async (user)=>{
    user.password = await bcrypt.hash(user.password, 10);
}) //similarly we can add beforeUpdate, beforeDelete etc. hooks for our betterment


User.prototype.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

User.prototype.matchRefreshToken = async function (enteredRefreshToken) {
    return await bcrypt.compare(enteredRefreshToken, this.refreshToken);
}

module.exports = User;

// Small note for dev:- 
    //In matchPassword instance method, we cannot use arrow function as we cannot use 'this' keyword in arrow functions

const jwt = require('jsonwebtoken');
const env = require('../config/env');
const User = require('../models/user.model');

exports.protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    
    try {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, env.JWT_SECRET);
        const user = await User.findByPk(decoded.id);
        if(!user){
            return res.status(401).json({message: 'Unauthorized'});
        }
        if(decoded.tokenVersion !== user.tokenVersion){
            return res.status(401).json({ message: 'Session Expired. Please login again. '});
        }
        req.user = decoded;
        next();
    } catch (err) {
        if(err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }
        return res.status(403).json({ message: 'Unauthorized' });
    }
};
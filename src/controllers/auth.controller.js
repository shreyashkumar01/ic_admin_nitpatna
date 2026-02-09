const authService = require('../services/auth.service');
const env = require('../config/env');

exports.login = async (req, res, next) => {
    try{
        const result = await authService.login(req.body);
        res.cookie('refreshToken', result.refreshToken, env.COOKIE_OPTIONS);
        res.status(200).json({message: 'Login successful', accessToken: result.accessToken});
    }catch(err){
        next(err);
    }
};

exports.refreshToken = async (req, res, next) => {
    try{
        const refreshToken = req.cookies.refreshToken;
        const result = await authService.refreshToken({refreshToken});
        res.status(200).json({message: 'Token refreshed successfully', accessToken: result.accessToken});
    }catch(err){
        next(err);
    }
};

exports.register = async (req,res,next) => {
    try{
        const result = await authService.register(req.body);
        res.status(201).json({message: 'User registered successfully', ...result});
    }catch(err){
        next(err);
    }
};

exports.listUsers = async (req,res,next) => {
    try{
        const result = await authService.listUsers();
        res.status(200).json({message: 'Users listed successfully', ...result});
    }catch(err){
        next(err);
    }
};

exports.logout = async (req, res, next) => {
    try{
        await authService.logout(req.user.id);
        res.clearCookie('refreshToken', env.COOKIE_OPTIONS);
        res.status(200).json({message: 'Logout successful'});
    }catch(err){
        next(err);
    }
}
const express = require('express');
const { login, register, listUsers, refreshToken, logout } = require('../controllers/auth.controller.js');
const { protect } = require('../middleware/auth.middleware.js');
const { authorize } = require('../middleware/authorize.middleware.js');
const { rateLimiter } = require('../middleware/rateLimit.middleware.js');
const { validate } = require('../middleware/validate.middleware');
const { authSchema } = require('../validators/auth.validator');
const router = express.Router();

router.post('/login', rateLimiter, validate(authSchema), login);
router.post('/register', protect, authorize(['SUPER_ADMIN']), validate(authSchema),register);
router.get('/listUsers', protect, authorize(['ADMIN','SUPER_ADMIN']), listUsers);
router.post('/refreshToken', refreshToken);
router.post('/logout', rateLimiter, protect, logout);
module.exports = router;
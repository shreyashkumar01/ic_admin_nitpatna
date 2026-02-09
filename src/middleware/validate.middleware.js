const { ZodError } = require('zod');

exports.validate = (schema) => (req, res, next) => {
    try {
        req.body = schema.parse(req.body);
        next();
    } catch(err){
        if (err instanceof ZodError){
            return res.status(400).json({
                success: false,
                message: 'Invalid input',
                errors: err.issues.map(e => ({
                    field : e.path.join('.'),
                    message : e.message
                }))
            });
        }
        return next(err);
    }
}
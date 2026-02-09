const { z } = require('zod');

exports.authSchema = z.object({
    email: z
        .string()
        .email('Invalid email format')
        .max(100),
    
    password: z
        .string()
        .min(8, 'Password must be atleast 8 characters long')
        .max(72, 'Password must be atmost 72 characters long'),
    
    role: z.enum(['ADMIN','SUPER_ADMIN']).optional(),
})
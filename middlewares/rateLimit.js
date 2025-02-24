// middlewares/rateLimit.js - Configuración de ejemplo para rate limiting (puede integrarse directamente en app.js)
const rateLimit = require('express-rate-limit');
exports.apiLimiter = rateLimit({
	windowMs: 60 * 1000,  // 1 minuto
	max: 20,              // 20 peticiones por IP por minuto
	message: 'Too many requests, please try again later.'
});

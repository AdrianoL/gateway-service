// routes.js
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

// Obtención de URLs de cada microservicio a partir de variables de entorno
const authServiceUrl = process.env.AUTH_SERVICE_URL || 'http://auth-service:3001';
const usersServiceUrl = process.env.USERS_SERVICE_URL || 'http://users-service:3002';
const notificationsServiceUrl = process.env.NOTIFICATIONS_SERVICE_URL || 'http://notifications-service:3003';
const paymentsServiceUrl = process.env.PAYMENTS_SERVICE_URL || 'http://payments-service:3004';
const electoralServiceUrl = process.env.ELECTORAL_SERVICE_URL || 'http://electoral-service:3005';

// Función que revisa la ruta de cada petición y redirige al microservicio correspondiente
const routeRequests = (req, res, next) => {
	console.log('routeRequests');
	const path = req.path;
	console.log(`Gateway routing request: ${req.method} ${path}`);

	console.log('path.startsWith/auth');
	console.log(path.startsWith('/auth'));
	if (path.startsWith('/auth')) {
		return createProxyMiddleware({
			target: authServiceUrl,
			changeOrigin: true,
			logLevel: 'debug'
		})(req, res, next);
	} else if (path.startsWith('/users')) {
		return createProxyMiddleware({
			target: usersServiceUrl,
			changeOrigin: true,
			logLevel: 'debug'
		})(req, res, next);
	} else if (path.startsWith('/notifications')) {
		return createProxyMiddleware({
			target: notificationsServiceUrl,
			changeOrigin: true,
			logLevel: 'debug'
		})(req, res, next);
	} else if (path.startsWith('/payments')) {
		return createProxyMiddleware({
			target: paymentsServiceUrl,
			changeOrigin: true,
			logLevel: 'debug'
		})(req, res, next);
	} else if (path.startsWith('/electoral')) {
		return createProxyMiddleware({
			target: electoralServiceUrl,
			changeOrigin: true,
			logLevel: 'debug'
		})(req, res, next);
	} else {
		// Si no coincide con ningún prefijo, responde 404.
		res.status(404).json({ error: 'Endpoint not found in Gateway' });
	}
};

module.exports = { routeRequests };

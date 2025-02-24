// middlewares/authMiddleware.js - Middleware para verificar JWT en las solicitudes
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'MiClaveSecretaJWT';  // Clave para firmar/verificar

exports.verifyToken = (req, res, next) => {
	// Suponer que el token viene en la cabecera Authorization: Bearer <token>
	const authHeader = req.headers['authorization'];
	if (!authHeader) {
		return res.status(401).json({ error: 'No token provided' });
	}
	const token = authHeader.split(' ')[1];
	try {
		const decoded = jwt.verify(token, JWT_SECRET);  // Verificar firma JWT&#8203;:contentReference[oaicite:30]{index=30}
		req.user = decoded;  // adjuntar info de usuario decodificada (id, roles, etc.) a la request
		next();
	} catch (err) {
		return res.status(401).json({ error: 'Invalid or expired token' });
	}
};

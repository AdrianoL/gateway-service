// app.js
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { routeRequests } = require('./routes');
const authMiddleware = require('./middlewares/authMiddleware');


const app = express();

// Configuración de seguridad y middlewares básicos
app.use(helmet());
app.use(cors({ origin: '*' }));

// Middleware para responder a las peticiones preflight (OPTIONS)
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Rate limiting: limita a 100 peticiones por IP cada 15 minutos
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100,
  message: 'Demasiadas solicitudes, por favor intente nuevamente más tarde.'
});
app.use(limiter);

// // Middleware de autenticación JWT (se aplica a rutas protegidas)
// app.use(authMiddleware.verifyToken);

// Si estamos detrás de un proxy (por ejemplo, en producción) lo indicamos
app.set('trust proxy', 1);

console.log('por entrar a routs');
// Rutas: se utiliza el archivo routes.js para dirigir las solicitudes
app.use('/', routeRequests);

// 404 Handler (ruta no encontrada)
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Error en Gateway:', err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Gateway running on port ${PORT}`);
});

module.exports = app;

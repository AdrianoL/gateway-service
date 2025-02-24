gateway-service/
├── app.js                # Configuración principal del API Gateway
├── routes.js             # Definición de rutas de proxy hacia microservicios
├── middlewares/
│   ├── authMiddleware.js     # Middleware JWT: verifica y decodifica token
│   └── rateLimit.js          # Configuración de rate limiting
└── package.json         # Dependencias (express, jsonwebtoken, http-proxy-middleware, etc.)

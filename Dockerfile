# Usamos una imagen base de Node.js (versión 18 en Alpine para que sea ligera)
FROM node:18-alpine

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos de definición de dependencias y bloque (si existe)
COPY package*.json ./

# Instalamos las dependencias en modo producción
RUN npm install --production

# Copiamos el resto del código de la aplicación al contenedor
COPY . .

# Exponemos el puerto en el que se ejecuta el gateway (ajústalo si usas otro puerto)
EXPOSE 4000

# Comando para iniciar la aplicación
CMD ["node", "app.js"]

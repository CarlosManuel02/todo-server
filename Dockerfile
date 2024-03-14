# Utiliza la imagen base Node.js
FROM node:20.9.0-alpine

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el archivo package.json y package-lock.json a /app
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Expone el puerto 8080 en el contenedor
EXPOSE 8080

# Ejecuta el comando de inicio de la aplicación
CMD ["npm", "run", "start:dev"]
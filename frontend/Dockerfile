# frontend/Dockerfile
# Etapa de build
FROM node:18-alpine as build

WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar código fuente
COPY . .

# Buildear la aplicación con Vite
RUN npm run build

# --- Fase de producción ---
FROM node:18-alpine AS production

WORKDIR /app

# Instalar 'serve' para servir archivos estáticos
RUN npm install -g serve

# Copiar solo los archivos estáticos construidos desde la fase anterior
COPY --from=build /app/dist ./dist

# Exponer el puerto 3000
EXPOSE 3000

# Comando para servir la aplicación
CMD ["serve", "-s", "dist", "-l", "3000"]
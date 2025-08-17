#!/bin/bash

# =========================================================================
# Resumen del Proceso de Despliegue de la Aplicación "Cumplenda"
# =========================================================================
# Este script resume los pasos clave tomados para desplegar la aplicación
# en un servidor, basándose en el historial de comandos proporcionado.
# -------------------------------------------------------------------------

# --- PASO 1: PREPARACIÓN DEL SERVIDOR ---
# Se actualizó el sistema y se instalaron las dependencias necesarias
# para Docker.
echo "### 1. Preparando el servidor e instalando Docker y Docker Compose..."
sudo apt update && sudo apt upgrade -y
sudo apt install -y docker-ce docker-ce-cli containerd.io

# Se instaló Docker Compose.
sudo curl -L "https://github.com/docker/compose/releases/download/v2.21.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Se agregó el usuario actual al grupo de docker para evitar usar 'sudo'.
sudo usermod -aG docker $USER

# Se verificó que la instalación fuera exitosa.
docker --version
docker-compose --version
docker run hello-world


# --- PASO 2: DESCARGA DE IMÁGENES DE LA APLICACIÓN ---
# Se descargaron las imágenes de Docker para el frontend, backend y la base de datos
# desde Docker Hub. Se usaron tags específicos (:amd64) para asegurar la compatibilidad.
echo "### 2. Descargando las imágenes de la aplicación desde Docker Hub..."
docker pull isabellabresciani/cumplenda-backend:amd64
docker pull isabellabresciani/cumplenda-frontend-3000:amd64 # Versión final con puerto 3000
docker pull mysql:8.0


# --- PASO 3: CONFIGURACIÓN DE LA ARQUITECTURA ---
# Se crearon los archivos de configuración para orquestar los servicios.
echo "### 3. Creando archivos de configuración (docker-compose y nginx)..."

# Se creó un archivo docker-compose.yml para definir los 4 servicios:
# - cumplenda-frontend
# - cumplenda-backend
# - cumplenda-mysql (base de datos)
# - nginx (proxy inverso)
# Nota: La creación fue un proceso iterativo usando 'nano'.
nano docker-compose.yml

# Se creó un archivo de configuración para Nginx para enrutar el tráfico:
# - Las peticiones a la raíz ("/") se dirigen al frontend.
# - Las peticiones a "/api/" se dirigen al backend.
nano nginx.conf

# Se creó un script de inicialización para la base de datos MySQL.
nano init.sql


# --- PASO 4: ORQUESTACIÓN Y DEPURACIÓN ---
# Se utilizó Docker Compose para levantar toda la infraestructura.
# Este fue el paso más iterativo, involucrando ciclos de prueba y error.
echo "### 4. Lanzando la aplicación y depurando..."

# Comando principal para iniciar todos los servicios en segundo plano.
docker-compose up -d

# Comandos de depuración más utilizados durante el proceso:
# a) Ver el estado de los contenedores en ejecución.
docker ps -a

# b) Detener y eliminar todos los contenedores y volúmenes para un reinicio limpio.
docker-compose down -v

# c) Revisar los logs de un servicio específico para encontrar errores.
docker-compose logs backend
docker-compose logs frontend
docker-compose logs nginx

# d) Limpieza manual de recursos de Docker para resolver conflictos.
docker container prune -f
docker network prune -f

# e) Conectarse a un contenedor para ejecutar comandos de diagnóstico.
docker exec -it cumplenda-mysql mysql -u app_user -p cumplenda
docker exec -it nginx_container nginx -t # Probar la sintaxis de Nginx

echo "### Despliegue completado."
# El paso final fue guardar el historial de comandos.
history > comandos.txt
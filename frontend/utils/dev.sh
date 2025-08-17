# Rebuild with the fix
docker build -t frontend_dev -f Dockerfile.dev .

# Run the container
docker run -p 5000:5000 frontend_dev

# Or run in detached mode
docker run -d --name frontend-container-dev -p 5000:5000 frontend_dev
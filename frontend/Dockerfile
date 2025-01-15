FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Add build argument for API URL
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

# Build application
RUN npm run build

# Install serve to serve the static files
RUN npm install -g serve

# Expose port 80
EXPOSE 80

# Start serve
CMD ["serve", "-s", "dist", "-l", "80"]
# This is the FRONTEND Docker file
# Step 1: Build the app
FROM node:18 AS builder
WORKDIR /app
COPY ../../package.json ../../package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Serve the app
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
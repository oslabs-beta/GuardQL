# This is the BACKEND Docker file
FROM node:18
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 4000
CMD ["node", "dist/server.mjs"]
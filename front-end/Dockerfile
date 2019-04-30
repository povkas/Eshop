#build stage for a Node.js application
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . /app/
RUN npm run build
RUN ls .

#production stage
FROM nginx:stable-alpine as production-stage
COPY /dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
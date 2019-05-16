#build stage for a Node.js application
FROM node:11.15.0-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . /app/
RUN npm run build
EXPOSE 80
# start app
COPY ./docker.start.sh /app/docker.start.sh
RUN chmod +x /app/docker.start.sh

CMD ["/app/docker.start.sh"]
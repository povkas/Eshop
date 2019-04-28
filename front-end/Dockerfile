FROM node:9.6.1
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i --silent
COPY . ./
CMD ["npm", "start"]
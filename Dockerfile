FROM node:10-alpine

WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9001
CMD ["node", "src/server/server.js"]
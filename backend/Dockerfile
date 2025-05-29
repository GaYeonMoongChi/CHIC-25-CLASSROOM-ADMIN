FROM node:18

WORKDIR /app
COPY . .

RUN npm install

COPY .env .env

EXPOSE 8000

CMD ["node", "server.js"]

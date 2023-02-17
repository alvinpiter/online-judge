FROM node:16-alpine

WORKDIR /app
COPY . .

RUN npm ci

EXPOSE 5000

CMD ["npm", "run", "start:dev"]

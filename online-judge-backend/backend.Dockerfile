FROM node:16-alpine

WORKDIR /app
COPY . .

RUN apk update
RUN apk add python3
RUN apk add g++

RUN npm ci

EXPOSE 5000

CMD ["npm", "run", "start:dev"]

FROM node:16-alpine as builder
WORKDIR /app
COPY . .

ENV REACT_APP_BACKEND_API_URL http://34.149.185.114/api
ENV REACT_APP_CONTEST_START_TIME_IN_MILLISECONDS 1676851200000

RUN npm ci
RUN npm run build

#####################################################
FROM nginx:1.20.0-alpine as server

ENV NODE_ENV production

COPY --from=builder /app/build /usr/share/nginx/html
COPY prod-nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

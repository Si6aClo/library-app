FROM node:13.12.0-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . ./
EXPOSE 3000

ARG APP_HOST
ARG API_PORT

ENV REACT_APP_APP_HOST $APP_HOST
ENV REACT_APP_API_PORT $API_PORT

CMD [ "npm", "start" ]
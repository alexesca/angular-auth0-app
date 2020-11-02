FROM node:12-alpine

LABEL maintainer="alexescamore@gmail.com"

RUN mkdir -p /home/nest/app/node_modules && chown -R node:node /home/nest/app

WORKDIR /home/nest/app

COPY package*.json ./
COPY dist/apps/api ./api
COPY dist/apps/nx-app ./nx-app

RUN  npm install

EXPOSE 4200

ENTRYPOINT ["node", "./api/main.js"]
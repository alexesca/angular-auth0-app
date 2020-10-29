/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as jwt from "express-jwt";
import * as jwks from "jwks-rsa";
const url = require('url');

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);


  const auth0JWTMiddleware = jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: process.env.JWKS_URI
    }),
    audience: process.env.AUTH0_AUDIENCE,
    issuer: process.env.AUTH0_ISSUER_URL,
    algorithms: [process.env.AUTH_ALGORITHM]
  })
    .unless({
      path: [
        '/index.html',
        { url: '/', methods: ['GET', 'PUT'] }
      ],
      custom: function (req) {
        var ext = url.parse(req.originalUrl).pathname.substr(-4);
        return !~['.jpg', '.html', '.css', '.js', '.json', '.png', '.ico'].indexOf(ext);
      }
    })
  app.use(auth0JWTMiddleware);
  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();

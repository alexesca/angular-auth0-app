/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as jwt from "express-jwt";
import * as jwks from "jwks-rsa";
const url = require('url');
import { includes } from 'lodash';

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
      jwksUri: 'https://auth-app-1.auth0.com/.well-known/jwks.json'
    }),
    audience: 'http://localhost:8080',
    issuer: 'https://auth-app-1.auth0.com/',
    algorithms: ['RS256']
  })
    .unless({
      custom: function (req) {
        if (req.originalUrl === '/') {
          return true
        };
        var ext = url.parse(req.originalUrl).pathname.substr(-5);
        const isExtensionInArray = includes(['.jpg', '.html', '.css', '.js', '.json', '.png', '.ico'], ext);
        return isExtensionInArray;
      }
    })
  app.use(auth0JWTMiddleware);
  app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send('invalid token...');
    }
  });
  // app.use(jwt({ secret: 'shhhhhhared-secret', algorithms: ['HS256'] }));
  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();

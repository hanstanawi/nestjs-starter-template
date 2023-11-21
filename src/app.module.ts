import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    LoggerModule.forRoot({
      pinoHttp: {
        autoLogging: process.env.NODE_ENV === 'development',
        customProps: () => ({
          context: 'HTTP',
        }),
        customLogLevel: (req, res, err) => {
          if (res.statusCode >= 400 || err) {
            return 'error';
          } else if (res.statusCode >= 300 && res.statusCode < 400) {
            return 'silent';
          }
          return 'info';
        },
        serializers: {
          req(req) {
            req.body = req.raw.body;
            return req;
          },
        },
        customErrorMessage: (req, res) => {
          return 'Request errored with status code: ' + res.statusCode;
        },
        transport:
          process.env.NODE_ENV !== 'production'
            ? {
                target: 'pino-pretty',
                options: {
                  singleLine: true,
                  colorizeObjects: true,
                  colorize: true,
                },
              }
            : undefined,
      },
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

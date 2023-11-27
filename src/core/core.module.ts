import { CacheModule } from '@nestjs/cache-manager';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { LoggerModule } from 'nestjs-pino';
import { DatabaseModule } from 'src/database/database.module';

import { CacheService } from './cache/cache.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const username = configService.get('redis.username');
        const password = configService.get('redis.password');

        return {
          isGlobal: true,
          store: redisStore,
          host: configService.get('REDIS_HOST') as string,
          port: configService.get('REDIS_PORT') as string,
          ...(username && { username }),
          ...(password && { password }),
          no_ready_check: true,
          ttl: 10000, // Default 10s
        };
      },
      inject: [ConfigService],
    }),
    DatabaseModule,
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
          process.env.NODE_ENV === 'development'
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
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CoreModule {}

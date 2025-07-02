import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { JobsModule } from './jobs/jobs.module';

const LokiTransport = require('winston-loki');

const getLogOrigin = () => {
  const stack = new Error().stack;

  if (!stack) {
    return ''; 
  }

  const stackLines = stack.split('\n');
  
  const line = stackLines.find((line) => line.includes(__dirname) && !line.includes('node_modules'));

  if (line) {
    const parts = line.trim().match(/\((.*):(\d+):(\d+)\)$/);
    if (parts) {
      const filePath = parts[1].replace(__dirname, '');
      return `${filePath}:${parts[2]}`;
    }
  }
  return '';
};


@Module({
  imports: [
    UserModule,
    JobsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const addOriginFormat = winston.format((info) => {
          info.origin = getLogOrigin();
          return info;
        });

        return {
          transports: [
            new winston.transports.Console({
              level: configService.get<string>('LOG_LEVEL', 'info'),
              format: winston.format.combine(
                winston.format.timestamp({ format: 'MM/DD/YYYY, h:mm:ss A' }),
                winston.format.ms(),
                addOriginFormat(),
                winston.format.colorize({ all: true }),
                winston.format.printf((info) => {
                  const { timestamp, level, message, context, ms, origin } = info;
                  const pid = process.pid;
                  const appName = 'MyApp';

                  const ctx = context ? ` [${context}]` : '';
                  const ori = origin ? ` (${origin})` : '';

                  return `[${appName}] ${pid} - ${timestamp}     ${level}${ctx}${ori}: ${message} ${ms}`;
                }),
              ),
            }),
            // other transports...
            new LokiTransport({
              host: 'http://loki:3100', // Endereço do seu serviço Loki
              labels: { app: 'seu-projeto-nestjs' },
              json: true,
              format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json(),
              ),
              replaceTimestamp: true,
              onConnectionError: (err) => console.error(err),
            }),
          ],
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
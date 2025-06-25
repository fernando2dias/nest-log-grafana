import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

// <<< NOVO: Função auxiliar para encontrar a origem do log na pilha de chamadas >>>
const getLogOrigin = () => {
  const stack = new Error().stack;

  // <<< CORREÇÃO: Verificamos se a pilha (stack) existe antes de usá-la >>>
  if (!stack) {
    return ''; // Se não houver pilha, retorna uma string vazia com segurança
  }
  // Encontra a primeira linha na pilha que pertence ao nosso código de aplicação
  const stackLines = stack.split('\n');
  
  const line = stackLines.find((line) => line.includes(__dirname) && !line.includes('node_modules'));

  if (line) {
    // Extrai o caminho do arquivo e a linha
    const parts = line.trim().match(/\((.*):(\d+):(\d+)\)$/);
    if (parts) {
      const filePath = parts[1].replace(__dirname, ''); // Deixa o caminho relativo
      return `${filePath}:${parts[2]}`; // Retorna "caminho/arquivo.ts:linha"
    }
  }
  return '';
};


@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // <<< MODIFICADO: Adicionamos o configService para uso futuro, se necessário >>>
      useFactory: (configService: ConfigService) => {
        // <<< NOVO: Formato customizado que adiciona a propriedade "origin" ao log >>>
        const addOriginFormat = winston.format((info) => {
          info.origin = getLogOrigin();
          return info;
        });

        return {
          transports: [
            new winston.transports.Console({
              // Podemos usar o configService para definir o nível do log dinamicamente
              level: configService.get<string>('LOG_LEVEL', 'info'),

              // <<< MODIFICADO: Substituímos o nestLike por uma combinação customizada com printf >>>
              format: winston.format.combine(
                winston.format.timestamp({ format: 'YYYY-MM-DD, h:mm:ss A' }),
                winston.format.ms(),
                addOriginFormat(), // Adiciona a origem (arquivo:linha)
                winston.format.colorize({ all: true }),
                // O printf nos dá controle total sobre a string de saída final
                winston.format.printf((info) => {
                  const { timestamp, level, message, context, ms, origin } = info;
                  const pid = process.pid; // Pegamos o ID do processo
                  const appName = 'MyApp'; // O nome da sua aplicação

                  const ctx = context ? ` [${context}]` : '';
                  const ori = origin ? ` (${origin})` : '';

                  // Montamos o log no formato desejado, similar ao nestLike mas com a origem
                  return `[${appName}] ${pid} - ${timestamp} ${level}${ctx}${ori}: ${message} ${ms}`;
                }),
              ),
            }),
            // other transports...
          ],
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
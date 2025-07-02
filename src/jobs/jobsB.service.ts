import { Inject, Injectable } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";

@Injectable()
export class jobsBService{
    constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}
    
    async initJob(){
        const req = {
            url: '/jobs',
            ip: '127.0.0.1',
            body: {},
            method: 'GET'
        };

        let numberA = Math.floor(Math.random() * 1001);
        let numberB = Math.floor(Math.random() * 1001);
        let numberC = Math.floor(Math.random() * 1001);
        let numberD = Math.floor(Math.random() * 1001);

        let result = numberA * numberB - numberC / numberD;

        if(result < 0) {
            this.logger.error(`Resultado negativo: ${result}`, {
                context: jobsBService.name,
                method: req.method,
                url: req.url,
                ip: req.ip,
                body: req.body,
            });
        }

        if(result > 0 && result < 200) {
            this.logger.warn(`Resultado abaixo: ${result}`, {
                context: jobsBService.name,
                method: req.method,
                url: req.url,
                ip: req.ip,
                body: req.body,
            });
        }


        if(result > 200) {
            this.logger.info(`Resultado acima: ${result}`, {
                context: jobsBService.name,
                method: req.method,
                url: req.url,
                ip: req.ip,
                body: req.body,
            });
        }

        if(result == 0) {
            this.logger.crit(`Resultado ZERADO`, {
                context: jobsBService.name,
                method: req.method,
                url: req.url,
                ip: req.ip,
                body: req.body,
            });
        }

        this.logger.info('Job B Finalizado', {
            context: jobsBService.name,
            method: req.method,
            url: req.url,
            ip: req.ip,
            body: req.body,
        });

    }
}
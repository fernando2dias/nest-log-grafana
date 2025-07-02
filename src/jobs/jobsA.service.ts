import { Inject, Injectable } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";

@Injectable()
export class jobsAService {
    constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

    async initJob() {
        
        const req = {
            url: '/jobs',
            ip: '127.0.0.1',
            body: {},
            method: 'GET'
        };

        let number = Math.floor(Math.random() * 1001);
        if (number % 2 === 0) {
            this.logger.info(`Número par: ${number}`, {
                context: jobsAService.name,
                method: req.method,
                url: req.url,
                ip: req.ip,
                body: req.body,
            });
        } else {
            this.logger.warn(`Número ímpar: ${number}`, {
                context: jobsAService.name,
                method: req.method,
                url: req.url,
                ip: req.ip,
                body: req.body,
            });
        }

        this.logger.info('Job A Finalizado', {
            context: jobsAService.name,
            method: req.method,
            url: req.url,
            ip: req.ip,
            body: req.body,
        });

        return `Numero gerado: ${number}`;
    }
}
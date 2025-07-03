import { Inject, Injectable } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";

@Injectable()
export class jobsCService{
    constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}
    
    async initJob(){
        const req = {
            url: '/jobs',
            ip: '127.0.0.1',
            body: {},
            method: 'GET'
        };

        let number = Math.floor(Math.random() * 1001);
        // verificando se o número é primo
        let isPrime = number > 1 && Array.from({length: number - 2}, (_, i) => i + 2)
            .every(i => number % i !== 0);
        
        if(isPrime){
            this.logger.info(`${number} é numero primo: ${isPrime}`, {
                context: jobsCService.name,
                method: req.method,
                url: req.url,
                ip: req.ip,
                body: req.body,
            });
        }else{
            this.logger.error(`${number} não é numero primo: ${isPrime}`, {
                context: jobsCService.name,
                method: req.method,
                url: req.url,
                ip: req.ip,
                body: req.body,
            });
        }
    }
}
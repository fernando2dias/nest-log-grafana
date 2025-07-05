import { Inject, Injectable } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";

@Injectable()
export class jobsEService{
    constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}
    
    async initJob() {
        //PRODUCER
    }
}
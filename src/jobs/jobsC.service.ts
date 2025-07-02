import { Inject, Injectable, Logger } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";

@Injectable()
export class jobsCService{
    constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}
    
    async initJob(){}
}
import { Module } from "@nestjs/common";
import { JobsController } from "./jobs.controller";
import { jobsAService } from "./jobsA.service";
import { jobsBService } from "./jobsB.service";
import { jobsCService } from "./jobsC.service";
import { jobsEService } from "./jobsE.service";

@Module({
    controllers: [JobsController],
    providers: [jobsAService, jobsBService, jobsCService, jobsEService],
    exports: [],
    imports: [],
})
export class JobsModule {}
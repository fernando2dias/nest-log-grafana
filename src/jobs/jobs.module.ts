import { Module } from "@nestjs/common";
import { JobsController } from "./jobs.controller";
import { jobsAService } from "./jobsA.service";
import { jobsBService } from "./jobsB.service";
import { jobsCService } from "./jobsC.service";

@Module({
    controllers: [JobsController],
    providers: [jobsAService, jobsBService, jobsCService],
    exports: [],
    imports: [],
})
export class JobsModule {}
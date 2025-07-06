import { Module } from "@nestjs/common";
import { JobsController } from "./jobs.controller";
import { jobsAService } from "./jobsA.service";
import { jobsBService } from "./jobsB.service";
import { jobsCService } from "./jobsC.service";
import { jobsEService } from "./jobsE.service";
import { MessagesModule } from "src/messages/messages.module";

@Module({
    controllers: [JobsController],
    providers: [jobsAService, jobsBService, jobsCService, jobsEService],
    exports: [],
    imports: [MessagesModule],
})
export class JobsModule {}
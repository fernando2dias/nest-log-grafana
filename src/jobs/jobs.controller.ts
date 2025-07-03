import { Controller, Get, Inject } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import { jobsAService } from "./jobsA.service";
import { jobsBService } from "./jobsB.service";
import { jobsCService } from "./jobsC.service";

@Controller('jobs')
export class JobsController{
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        private readonly jobsAService: jobsAService,
        private readonly jobsBService: jobsBService,
        private readonly jobsCService: jobsCService,
    ) {}

    @Get()
    async initJobs(){
        
        setInterval(async () => {
            try {
            this.logger.info('Iniciando tarefa A');
            await this.jobsAService.initJob();
            } catch (error) {
            this.logger.error('Erro ao executar tarefa A:', error.message);
            }
        }, Number(process.env.JOB_A_TIME) || 30000); // 30 seconds

        setInterval(async () => {
            try {
            this.logger.info('Iniciando tarefa B');
            await this.jobsBService.initJob();
            } catch (error) {
            this.logger.error('Erro ao executar tarefa B:', error.message);
            }
        }, Number(process.env.JOB_B_TIME) || 40000); // 40 seconds

        setInterval(async () => {
            try {
            this.logger.info('Iniciando tarefa C');
            await this.jobsCService.initJob();
            } catch (error) {
            this.logger.error('Erro ao executar tarefa C:', error.message);
            }
        }, Number(process.env.JOB_C_TIME) || 50000); // 50 seconds
    }
}
import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Controller()
export class AppController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly appService: AppService
  ) {}

  @Get()
  getHello(): string {
    this.logger.info('Info: Requisição recebida no endpoint /', {
      context: AppController.name,
      method: 'GET',
      url: '/',
      timestamp: new Date().toISOString(),
    });

    this.logger.warn('Warning: Requisição recebida no endpoint /', {
      context: AppController.name,
      method: 'GET',
      url: '/',
      timestamp: new Date().toISOString(),
    });

    this.logger.error('Error: Requisição recebida no endpoint /', {
      context: AppController.name,
      method: 'GET',
      url: '/',
      timestamp: new Date().toISOString(),
    });

    
    
    return this.appService.getHello();
  }
}

import { Body, Controller, Inject, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessageDTO } from './dtos/message.dto';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Controller()
export class MessagesController {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger, private readonly messagesService: MessagesService) { }

  @MessagePattern('test_event')
  public async pubSubHandler(@Payload() data: { message: string }) {
    this.logger.info('message received', data.message);
  }

  @Post('messages')
  public async teste(@Body() body: MessageDTO) {
    await this.messagesService.sendMessage(body.message);
    return { status: 'sending...' }
  }

}

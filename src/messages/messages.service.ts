import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@ApiTags('messages')
@Injectable()
export class MessagesService {
  constructor(
    @Inject('RABBITMQ_SERVICE') 
    private readonly client: ClientProxy,) {
  }

  async sendMessage(message: string) {
    return lastValueFrom(this.client.emit('test_event', { message }));
  }
}

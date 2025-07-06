import { Inject, Injectable } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { MessagesService } from "src/messages/messages.service";
import { Logger } from "winston";

@Injectable()
export class jobsEService {
  constructor(private messagesService: MessagesService) { }

  async initJob() {
    this.messagesService.sendMessage('teste...');
  }
}
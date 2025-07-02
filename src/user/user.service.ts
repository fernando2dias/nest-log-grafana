import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class UserService {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    // for (let i = 0; i < 1000000; i++) {
    //   setInterval(() => {
    //     let number = (i * Math.random()) / 2;
    //     if(number % 2 === 0) {
                 
    //       this.logger.info(`Número par: ${number}`, {
    //         context: UserService.name,
    //         method: 'GET',
    //         url: 'req.url',
    //         ip: 'req.ip',
    //         body: `Número par: ${number}`,
    //       });

    //     } else {
    //       this.logger.error(`Número ímpar: ${number}`);

    //       this.logger.error(`Número ímpar: ${number}`, {
    //         context: UserService.name,
    //         method: 'GET',
    //         url: 'req.url',
    //         ip: 'req.ip',
    //         body: `Número ímpar: ${number}`,
    //       });
    //     }
    //   }, 1000);
      
    // }

    // Gerar um numero inteiro entre 0 e 1000
    let number = Math.floor(Math.random() * 1001);
        if(number % 2 === 0) {
                 
          this.logger.info(`Número par: ${number}`, {
            context: UserService.name,
            method: 'GET',
            url: 'req.url',
            ip: 'req.ip',
            body: `Número par: ${number}`,
          });

        } else {
          this.logger.error(`Número ímpar: ${number}`);

          this.logger.error(`Número ímpar: ${number}`, {
            context: UserService.name,
            method: 'GET',
            url: 'req.url',
            ip: 'req.ip',
            body: `Número ímpar: ${number}`,
          });
        }

        



    return `Numero gerado: ${number}`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

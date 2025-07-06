import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Req } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly userService: UserService,
  ) {}

  @Post()
  create(@Req() req: Request, @Body() createUserDto: CreateUserDto) {
    this.logger.info('Requisição para criar usuário', {
      context: UserController.name,
      method: req.method,
      url: req.url,
      ip: req.ip,
      body: createUserDto,
    });
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll(@Req() req: Request) {
    // this.logger.info('Requisição para buscar todos os usuários', {
    //   context: UserController.name,
    //   method: req.method,
    //   url: req.url,
    //   ip: req.ip,
    // });

    
    setInterval(async () => {
      try {
        await this.userService.findAll();
      } catch (error) {
        console.error('Erro ao executar tarefa:', error);
      }
    }, Math.floor(Math.random() * 30000)); // 30 segundos

    
  }
  

  @Get(':id')
  findOne(@Req() req: Request, @Param('id') id: string) {
    this.logger.info('Requisição para buscar um usuário', {
      context: UserController.name,
      method: req.method,
      url: req.url,
      ip: req.ip,
      params: { id },
    });
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Req() req: Request, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    this.logger.info('Requisição para atualizar um usuário', {
      context: UserController.name,
      method: req.method,
      url: req.url,
      ip: req.ip,
      params: { id },
      body: updateUserDto,
    });
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Req() req: Request, @Param('id') id: string) {
    this.logger.warn('Requisição para remover um usuário', {
      context: UserController.name,
      method: req.method,
      url: req.url,
      ip: req.ip,
      params: { id },
    });
    return this.userService.remove(+id);
  }
}
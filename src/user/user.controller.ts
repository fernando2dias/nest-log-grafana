// Imports atualizados para incluir 'Req' e 'Request'
import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Req } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

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
  findAll(@Req() req: Request) {
    this.logger.info('Requisição para buscar todos os usuários', {
      context: UserController.name,
      method: req.method,
      url: req.url,
      ip: req.ip,
    });
    return this.userService.findAll();
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
    // Usando .warn() para uma operação destrutiva, como exemplo
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
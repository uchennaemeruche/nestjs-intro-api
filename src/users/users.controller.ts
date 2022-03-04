import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  async create(@Body() body: CreateUserDTO) {
    const newUser = await this.userService.create(body);
    return newUser;
  }

  @Put(':id')
  @HttpCode(204)
  updateUser(@Param('id') id: string, @Body() updateUserDTO): string {
    return 'Updating... \n' + id;
  }

  @Get()
  findAll(): string {
    return 'This returns all users \n';
  }

  @Get('admin')
  getAdmins(): object {
    return {};
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return 'A single user here ' + id + '\n';
  }
}

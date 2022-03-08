import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDTO } from './dto/create-user.dto';
import { User, UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  async create(@Body() user: CreateUserDTO) {
    return this.userService.create(user);
  }

  @Put(':id')
  @HttpCode(204)
  updateUser(
    @Param('id') id: number,
    @Body() user: CreateUserDTO,
  ): CreateUserDTO {
    return this.userService.updateOne(id, user);
  }

  @Get()
  findAll(): User[] {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): User {
    return this.userService.findOne(Number(id));
  }

  @Delete(':id')
  deleteOne(@Param('id') id: number): boolean {
    return this.userService.deleteOne(Number(id));
  }

  @Get('admin')
  getAdmins(): object {
    return {};
  }
}

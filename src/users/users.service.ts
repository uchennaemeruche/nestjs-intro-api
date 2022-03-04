import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { Gender } from './generals/utils';

export interface User {
  firstname: string;
  lastname: string;
  age: number;
  gender: Gender;
  id?: string;
}

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  create(user: CreateUserDTO) {
    const newUser: User = user;
    newUser.id = '11';
    this.users.push(newUser);
    return newUser;
  }

  findAll(): User[] {
    return this.users;
  }
}

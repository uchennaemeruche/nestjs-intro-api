import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { Gender } from './generals/utils';

export interface User {
  firstname: string;
  lastname: string;
  age: number;
  gender: Gender;
  id?: number;
  email: string;
}

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      firstname: 'Uchenna',
      lastname: 'Emeruche',
      age: 20,
      gender: Gender.male,
      email: 'uchenna@gmail.com',
      id: 1,
    },
    {
      firstname: 'Daniel',
      lastname: 'Uche',
      age: 21,
      gender: Gender.male,
      email: 'daniel@gmail.com',
      id: 2,
    },
    {
      firstname: 'Mariam',
      lastname: 'Mo',
      age: 22,
      gender: Gender.female,
      email: 'mariam@gmail.com',
      id: 3,
    },
  ];

  create(user: CreateUserDTO) {
    const userExist = this.getUser('email', user.email);
    if (userExist)
      throw new UnprocessableEntityException(
        'A user exist with this email address',
      );
    // Find the next id for the user
    const maxId: number = Math.max(...this.users.map((user) => user.id), 0);
    const id = maxId + 1;
    const newUser = {
      ...user,
      id,
    };

    this.users.push(newUser);
    return newUser;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    const user = this.getUser('id', id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  deleteOne(id: number): boolean {
    const user: User = this.getUser('id', id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const index: number = this.users.findIndex((user) => user.id === id);
    const deletedUser = this.users.splice(index, 1);
    return deletedUser ? true : false;
  }

  updateOne(id: number, user: CreateUserDTO): User {
    const userExist: User = this.getUser('id', id);
    if (!userExist) {
      throw new NotFoundException('User not found');
    }

    const emailExist = this.getUser('email', user.email);
    if (emailExist)
      throw new UnprocessableEntityException(
        'A user exist with this email address',
      );

    const updatedUser = {
      ...user,
      id,
    };

    this.users[id] = updatedUser;

    return updatedUser;
  }

  getUser(key, value): User {
    const user: User = this.users.find((user) => user[key] === value);
    return user;
  }
}

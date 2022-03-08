import { Gender } from 'users/generals/utils';

export interface CreateUserDTO {
  firstname: string;
  lastname: string;
  age: number;
  gender: Gender;
  email: string;
}

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class AuthService {

  async signIn() {
    return 'This action logs a user in';
  }

  constructor(private readonly usersService: UsersService) {}

  async registerCustomer(createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.registerCustomer(createUserDto);
  }

  async registerVet(createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.registerVet(createUserDto);
  }

  async registerShelter(createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.registerShelter(createUserDto);
  }
}

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private usersRepository: Repository<User>,) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userExists = await this.usersRepository.findOneBy({ email: createUserDto.email });
    if (userExists) {
      throw new BadRequestException('User already exists');
    }
    const user = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(user);
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    const userExists = await this.usersRepository.findOneBy({ id });
    if (!userExists) {
      throw new NotFoundException(`Does not exist a user with id: ${id}`);
    }

    return userExists;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userExists = await this.usersRepository.findOneBy({ id });
    if (!userExists) {
      throw new NotFoundException(`Does not exist a user with id: ${id}`);
    }

    return await this.usersRepository.update({ id }, updateUserDto);
  }

  async remove(id: number) {
    const userExists = await this.usersRepository.findOneBy({ id });
    if (!userExists) {
      throw new NotFoundException(`Does not exist a user with id: ${id}`);
    }

    return await this.usersRepository.delete({ id });
  }
}

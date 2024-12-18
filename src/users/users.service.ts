import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/shared/enums/role.enum';
import { CustomersService } from 'src/customers/customers.service';
import { VetsService } from 'src/vets/vets.service';
import { SheltersService } from 'src/shelters/shelters.service';
import { userProfileDto } from './dto/user-profile.dto';
import { plainToInstance } from 'class-transformer';
import { CustomerDetailsDto } from 'src/customers/dto/customer-details.dto';
import { VetDetailsDto } from 'src/vets/dto/vet-details.dto';
import { ShelterDetailsDto } from 'src/shelters/dto/shelter-details.dto';
import { UserDto } from './dto/user.dto';


@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private customerService: CustomersService,
    private vetService: VetsService,
    private shelterService: SheltersService,
  ) { }

  async create(createUserDto: CreateUserDto, role: Role): Promise<User> {
    const userExists = await this.usersRepository.findOneBy({ email: createUserDto.email });
    if (userExists) {
      throw new BadRequestException('User with this email already exists');
    }
    const user = this.usersRepository.create({ ...createUserDto, role });
    return await this.usersRepository.save(user);
  }

  async registerCustomer(createUserDto: CreateUserDto): Promise<userProfileDto> {
    const user = await this.create(createUserDto, Role.CUSTOMER);
    return plainToInstance(userProfileDto, {
      userName: user.userName,
      email: user.email,
      role: user.role,
      customerDetails: plainToInstance(CustomerDetailsDto, user.customer),
    });
  }
  async registerVet(createUserDto: CreateUserDto): Promise<userProfileDto> {
    const user = await this.create(createUserDto, Role.VET);
    return plainToInstance(userProfileDto, {
      userName: user.userName,
      email: user.email,
      role: user.role,
      vetDetails: plainToInstance(VetDetailsDto, user.vet),
    });
  }

  async registerShelter(createUserDto: CreateUserDto): Promise<userProfileDto> {
    const user = await this.create(createUserDto, Role.SHELTER);
    return plainToInstance(userProfileDto, {
      userName: user.userName,
      email: user.email,
      role: user.role,
      shelterDetails: plainToInstance(ShelterDetailsDto, user.shelter),
    });
  }

  async findAll(): Promise<UserDto[]> {
    const users = await this.usersRepository.find();
    return plainToInstance(UserDto, users, { excludeExtraneousValues: true });
  }

  async findOne(id: number): Promise<UserDto> {
    const userExists = await this.usersRepository.findOneBy({ id });
    if (!userExists) {
      throw new NotFoundException(`Does not exist a user with id: ${id}`);
    }

    return plainToInstance(UserDto, userExists, { excludeExtraneousValues: true });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userExists = await this.usersRepository.findOneBy({ id });
    if (!userExists) {
      throw new NotFoundException(`Does not exist a user with id: ${id}`);
    }

    await this.usersRepository.update({ id }, updateUserDto);
    
    return { message: 'User updated successfully' };
  }

  async remove(id: number) {
    const userExists = await this.usersRepository.findOne({ where: { id }, relations: ['vet', 'customer', 'shelter'] });

    if (!userExists) {
      throw new NotFoundException(`Does not exist a user with id: ${id}`);
    }

    if (userExists.vet) {
      await this.vetService.remove(userExists.vet.id);
    }
    if (userExists.customer) {
      await this.customerService.remove(userExists.customer.id);
    }
    if (userExists.shelter) {
      await this.shelterService.remove(userExists.shelter.id);
    }

    await this.usersRepository.remove(userExists);

    return { message: 'User deleted successfully' };
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ email });
    return user;
  }

  async getProfile(email: string): Promise<userProfileDto> {
    const user = await this.usersRepository.findOne({
      where: { email },
      relations: ['customer', 'vet', 'shelter'],
    });

    if (!user) throw new NotFoundException('User with this email does not exist');

    return plainToInstance(userProfileDto, {
      userName: user.userName,
      email: user.email,
      role: user.role,
      customerDetails: user.customer ? plainToInstance(CustomerDetailsDto, user.customer) : undefined,
      vetDetails: user.vet ? plainToInstance(VetDetailsDto, user.vet) : undefined,
      shelterDetails: user.shelter ? plainToInstance(ShelterDetailsDto, user.shelter) : undefined,
    });
  }

}
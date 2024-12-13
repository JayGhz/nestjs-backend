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
import { CreateCustomerDto } from 'src/customers/dto/create-customer.dto';
import { CreateVetDto } from 'src/vets/dto/create-vet.dto';
import { CreateShelterDto } from 'src/shelters/dto/create-shelter.dto';

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
      throw new BadRequestException('User already exists');
    }
    const user = this.usersRepository.create({ ...createUserDto, role });
    return await this.usersRepository.save(user);
  }

  // Registrar un nuevo Customer 
  async registerCustomer(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.create(createUserDto, Role.CUSTOMER); 
    
    const createCustomerDto: CreateCustomerDto = {
      userId: user.id,
      ...createUserDto.customer
    };
    
    return user;
  }

  // Registrar un nuevo Vet 
  async registerVet(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.create(createUserDto, Role.VET); 

    const createVetDto: CreateVetDto = {
      userId: user.id,
      ...createUserDto.vet
    };
    return user;
  }

  // Registrar un nuevo Shelter 
  async registerShelter(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.create(createUserDto, Role.SHELTER); 

    const createShelterDto: CreateShelterDto = {
      userId: user.id,
      ...createUserDto.shelter
    };
    return user;
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
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
  
    return await this.usersRepository.remove(userExists);
  }
  
}
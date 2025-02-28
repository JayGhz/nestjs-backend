import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Repository } from 'typeorm';
import { Pet } from './entities/pet.entity';
import { Breed } from '../breeds/entities/breed.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UserActiveInterface } from 'src/shared/interfaces/user-active.interface';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet)
    private petsRepository: Repository<Pet>,
    @InjectRepository(Breed)
    private breedsRepository: Repository<Breed>,
  ) { }

  async create(createPetDto: CreatePetDto, user: UserActiveInterface) {
    const breed = await this.breedsRepository.findOneBy({
      name: createPetDto.breedName
    });

    if (!breed) {
      throw new BadRequestException('Breed not found');
    }

    return await this.petsRepository.save({
      ...createPetDto,
      breed: breed,
      user: { id: user.id } as User
    });
  }

  async findAll() {
    return `This action returns all pets`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} pet`;
  }

  async update(id: number, updatePetDto: UpdatePetDto) {
    return `This action updates a #${id} pet`;
  }

  async remove(id: number) {
    return `This action removes a #${id} pet`;
  }
}

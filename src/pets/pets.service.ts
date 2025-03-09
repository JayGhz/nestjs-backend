import { Breed } from '@/breeds/entities/breed.entity';
import { CreatePetDto } from '@/pets/dto/create-pet.dto';
import { UpdatePetDto } from '@/pets/dto/update-pet.dto';
import { Pet } from '@/pets/entities/pet.entity';
import { UserActiveInterface } from '@/shared/interfaces/user-active.interface';
import { User } from '@/users/entities/user.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

  async findAll(): Promise<Pet[]> {
    return this.petsRepository.find();
  }

  async findOne(id: number): Promise<Pet> {
    const petExists = await this.petsRepository.findOneBy({ id });
    if (!petExists) {
      throw new BadRequestException(`Pet with id ${id} not found`);
    }
    return petExists;
  }

  async update(id: number, updatePetDto: UpdatePetDto) {
    const petExists = await this.petsRepository.findOneBy({ id });
    const breed = await this.validateBreed(updatePetDto.breedName);

    if (!petExists) {
      throw new BadRequestException(`Pet with id ${id} not found`);
    }
    return await this.petsRepository.update({ id }, {
      ...updatePetDto,
      breed
    });
  }

  async remove(id: number) {
    const petExists = await this.petsRepository.findOneBy({ id });
    if (!petExists) {
      throw new BadRequestException(`Pet with id ${id} not found`);
    }
    return await this.petsRepository.delete({ id });
  }

  private async validateBreed(breedName: string) {
    const breed = await this.breedsRepository.findOneBy({ name: breedName });
    if (!breed) {
      throw new BadRequestException('Breed not found');
    }
    return breed;
  }
}

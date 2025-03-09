import { CreateBreedDto } from '@/breeds/dto/create-breed.dto';
import { UpdateBreedDto } from '@/breeds/dto/update-breed.dto';
import { Breed } from '@/breeds/entities/breed.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BreedsService {

  constructor(@InjectRepository(Breed) private breedsRepository: Repository<Breed>) { }

  async create(createBreedDto: CreateBreedDto): Promise<Breed> {
    const breedExists = await this.breedsRepository.findOneBy({ name: createBreedDto.name });
    if (breedExists) {
      throw new BadRequestException('Breed already exists');
    }

    const breed = this.breedsRepository.create(createBreedDto);
    return await this.breedsRepository.save(breed);
  }

  async findAll(): Promise<Breed[]> {
    return this.breedsRepository.find();
  }

  async findOne(id: number): Promise<Breed> {
    const breedExists = await this.breedsRepository.findOneBy({ id });
    if (!breedExists) {
      throw new BadRequestException(`Does not exist a breed with id: ${id}`);
    }

    return breedExists;
  }

  async update(id: number, updateBreedDto: UpdateBreedDto) {
    const breedExists = await this.breedsRepository.findOneBy({ id });
    if (!breedExists) {
      throw new BadRequestException(`Does not exist a breed with id: ${id}`);
    }
    return await this.breedsRepository.update({ id }, updateBreedDto);
  }

  async remove(id: number): Promise<void> {
    const breedExists = await this.breedsRepository.findOneBy({ id });
    if (!breedExists) {
      throw new BadRequestException(`Does not exist a breed with id: ${id}`);
    }
    await this.breedsRepository.delete({ id });
  }
}

import { Injectable } from '@nestjs/common';
import { CreateShelterDto } from './dto/create-shelter.dto';
import { UpdateShelterDto } from './dto/update-shelter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shelter } from './entities/shelter.entity';

@Injectable()
export class SheltersService {

  constructor(@InjectRepository(Shelter) private sheltersRepository: Repository<Shelter>,) { }

  async create(createShelterDto: CreateShelterDto): Promise<Shelter> {
    const shelterExists = await this.sheltersRepository.findOneBy({ ruc: createShelterDto.ruc });
    if (shelterExists) {
      throw new Error('Shelter with this RUC already exists');
    }
    const shelter = this.sheltersRepository.create(createShelterDto);
    return this.sheltersRepository.save(shelter);
  }

  async findAll() {
    return await this.sheltersRepository.find();
  }

  async findOne(id: number): Promise<Shelter> {
    const shelterExists = await this.sheltersRepository.findOneBy({ id });
    if (!shelterExists) {
      throw new Error(`Does not exist a shelter with id: ${id}`);
    }

    return shelterExists;
  }

  async update(id: number, updateShelterDto: UpdateShelterDto) {
    const shelterExists = await this.sheltersRepository.findOneBy({ id });
    if (!shelterExists) {
      throw new Error(`Does not exist a shelter with id: ${id}`);
    }

    return await this.sheltersRepository.update({ id }, updateShelterDto);
  }

  async remove(id: number) {
    const shelterExists = await this.sheltersRepository.findOneBy({ id });
    if (!shelterExists) {
      throw new Error(`Does not exist a shelter with id: ${id}`);
    }

    return await this.sheltersRepository.delete({ id });
  }
}

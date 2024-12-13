import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVetDto } from './dto/create-vet.dto';
import { UpdateVetDto } from './dto/update-vet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vet } from './entities/vet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VetsService {

  constructor(@InjectRepository(Vet) private vetsRepository: Repository<Vet>,) { }

  async create(createVetDto: CreateVetDto): Promise<Vet> {
    const vetExists = await this.vetsRepository.findOneBy({ licensNumber: createVetDto.licensNumber });
    if (vetExists) {
      throw new BadRequestException('Vet already exists');
    }
    const vet = this.vetsRepository.create(createVetDto);
    return await this.vetsRepository.save(vet);
  }

  async findAll() {
    return await this.vetsRepository.find();
  }

  async findOne(id: number): Promise<Vet> {
    const vetExists = await this.vetsRepository.findOneBy({ id });
    if (!vetExists) {
      throw new NotFoundException(`Does not exist a vet with id: ${id}`);
    }

    return vetExists;
  }

  async update(id: number, updateVetDto: UpdateVetDto) {
    const vetExists = await this.vetsRepository.findOneBy({ id });
    if (!vetExists) {
      throw new NotFoundException(`Does not exist a vet with id: ${id}`);
    }

    return await this.vetsRepository.update({ id }, updateVetDto);
  }

  async remove(id: number) {
    const vetExists = await this.vetsRepository.findOneBy({ id });
    if (!vetExists) {
      throw new NotFoundException(`Does not exist a vet with id: ${id}`);
    }

    return await this.vetsRepository.delete({ id });
  }
}

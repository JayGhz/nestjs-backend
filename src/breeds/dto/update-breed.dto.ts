import { CreateBreedDto } from '@/breeds/dto/create-breed.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateBreedDto extends PartialType(CreateBreedDto) {}

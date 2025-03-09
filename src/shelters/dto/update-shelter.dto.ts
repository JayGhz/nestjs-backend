import { CreateShelterDto } from '@/shelters/dto/create-shelter.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateShelterDto extends PartialType(CreateShelterDto) {}

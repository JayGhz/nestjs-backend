import { CreatePetDto } from '@/pets/dto/create-pet.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdatePetDto extends PartialType(CreatePetDto) {}

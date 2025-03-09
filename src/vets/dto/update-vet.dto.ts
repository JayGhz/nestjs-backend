import { CreateVetDto } from '@/vets/dto/create-vet.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateVetDto extends PartialType(CreateVetDto) {}

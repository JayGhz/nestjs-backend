import { AuthModule } from '@/auth/auth.module';
import { BreedsModule } from '@/breeds/breeds.module';
import { Pet } from '@/pets/entities/pet.entity';
import { PetsController } from '@/pets/pets.controller';
import { PetsService } from '@/pets/pets.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  controllers: [PetsController],
  providers: [PetsService],
  imports: [TypeOrmModule.forFeature([Pet]), BreedsModule, AuthModule],
})
export class PetsModule { }

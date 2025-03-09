import { AuthModule } from '@/auth/auth.module';
import { BreedsController } from '@/breeds/breeds.controller';
import { BreedsService } from '@/breeds/breeds.service';
import { Breed } from '@/breeds/entities/breed.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  controllers: [BreedsController],
  providers: [BreedsService],
  imports: [TypeOrmModule.forFeature([Breed]), AuthModule],
  exports: [TypeOrmModule],
})
export class BreedsModule {}

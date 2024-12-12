import { Module } from '@nestjs/common';
import { SheltersService } from './shelters.service';
import { SheltersController } from './shelters.controller';
import { Shelter } from './entities/shelter.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [SheltersController],
  providers: [SheltersService],
  imports: [TypeOrmModule.forFeature([Shelter])],
  exports: [SheltersService],
})
export class SheltersModule { }

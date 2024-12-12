import { Module } from '@nestjs/common';
import { VetsService } from './vets.service';
import { VetsController } from './vets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vet } from './entities/vet.entity';

@Module({
  controllers: [VetsController],
  providers: [VetsService],
  imports: [TypeOrmModule.forFeature([Vet])],
  exports: [VetsService],
})
export class VetsModule {}

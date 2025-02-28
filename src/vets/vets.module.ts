import { forwardRef, Module } from '@nestjs/common';
import { VetsService } from './vets.service';
import { VetsController } from './vets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vet } from './entities/vet.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [VetsController],
  providers: [VetsService],
  imports: [TypeOrmModule.forFeature([Vet]), forwardRef(() => AuthModule)],
  exports: [VetsService],
})
export class VetsModule {}

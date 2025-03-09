import { AuthModule } from '@/auth/auth.module';
import { Vet } from '@/vets/entities/vet.entity';
import { VetsController } from '@/vets/vets.controller';
import { VetsService } from '@/vets/vets.service';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  controllers: [VetsController],
  providers: [VetsService],
  imports: [TypeOrmModule.forFeature([Vet]), forwardRef(() => AuthModule)],
  exports: [VetsService],
})
export class VetsModule {}

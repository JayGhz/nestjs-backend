import { AuthModule } from '@/auth/auth.module';
import { Shelter } from '@/shelters/entities/shelter.entity';
import { SheltersController } from '@/shelters/shelters.controller';
import { SheltersService } from '@/shelters/shelters.service';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  controllers: [SheltersController],
  providers: [SheltersService],
  imports: [TypeOrmModule.forFeature([Shelter]), forwardRef(() => AuthModule)],
  exports: [SheltersService],
})
export class SheltersModule { }

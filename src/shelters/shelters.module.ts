import { forwardRef, Module } from '@nestjs/common';
import { SheltersService } from './shelters.service';
import { SheltersController } from './shelters.controller';
import { Shelter } from './entities/shelter.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [SheltersController],
  providers: [SheltersService],
  imports: [TypeOrmModule.forFeature([Shelter]), forwardRef(() => AuthModule)],
  exports: [SheltersService],
})
export class SheltersModule { }

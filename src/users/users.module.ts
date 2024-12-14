import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from 'src/customers/customers.module';
import { SheltersModule } from 'src/shelters/shelters.module';
import { VetsModule } from 'src/vets/vets.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([User]), CustomersModule, SheltersModule, VetsModule],
  exports: [UsersService]

})
export class UsersModule { }

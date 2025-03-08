import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from '../customers/customers.module';
import { SheltersModule } from '../shelters/shelters.module';
import { VetsModule } from '../vets/vets.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([User]), CustomersModule, SheltersModule, VetsModule, forwardRef(() => AuthModule)],
  exports: [UsersService]

})
export class UsersModule { }

import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from 'src/customers/customers.module';
import { SheltersModule } from 'src/shelters/shelters.module';
import { VetsModule } from 'src/vets/vets.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([User]), CustomersModule, SheltersModule, VetsModule, forwardRef(() => AuthModule)],
  exports: [UsersService]

})
export class UsersModule { }

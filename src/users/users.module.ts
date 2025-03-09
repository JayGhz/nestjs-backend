import { AuthModule } from '@/auth/auth.module';
import { CustomersModule } from '@/customers/customers.module';
import { SheltersModule } from '@/shelters/shelters.module';
import { User } from '@/users/entities/user.entity';
import { UsersController } from '@/users/users.controller';
import { UsersService } from '@/users/users.service';
import { VetsModule } from '@/vets/vets.module';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([User]), CustomersModule, SheltersModule, VetsModule, forwardRef(() => AuthModule)],
  exports: [UsersService]

})
export class UsersModule { }

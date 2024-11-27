import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CustomersModule } from './customers/customers.module';
import { VetsModule } from './vets/vets.module';
import { SheltersModule } from './shelters/shelters.module';

@Module({
  imports: [UsersModule, AuthModule, CustomersModule, VetsModule, SheltersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { AuthModule } from '@/auth/auth.module';
import { CustomersController } from '@/customers/customers.controller';
import { CustomersService } from '@/customers/customers.service';
import { Customer } from '@/customers/entities/customer.entity';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
  imports: [TypeOrmModule.forFeature([Customer]), forwardRef(() => AuthModule)],
  exports: [CustomersService],
})
export class CustomersModule {}

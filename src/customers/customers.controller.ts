import { Auth } from '@/auth/decorators/auth.decorator';
import { CustomersService } from '@/customers/customers.service';
import { CreateCustomerDto } from '@/customers/dto/create-customer.dto';
import { UpdateCustomerDto } from '@/customers/dto/update-customer.dto';
import { Role } from '@/shared/enums/role.enum';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

@Auth(Role.ADMIN)
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.customersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customersService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.customersService.remove(id);
  }
}

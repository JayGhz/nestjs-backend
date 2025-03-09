import { CreateCustomerDto } from '@/customers/dto/create-customer.dto';
import { UpdateCustomerDto } from '@/customers/dto/update-customer.dto';
import { Customer } from '@/customers/entities/customer.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {

  constructor(@InjectRepository(Customer) private customersRepository: Repository<Customer>) { }

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer = this.customersRepository.create(createCustomerDto);
    return this.customersRepository.save(customer);
  }

  async findAll() {
    return await this.customersRepository.find();
  }

  async findOne(id: number): Promise<Customer> {
    const customerExists = await this.customersRepository.findOneBy({ id });
    if(!customerExists){
      throw new BadRequestException(`Does not exist a customer with id: ${id}`);
    }

    return customerExists;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const customerExists = await this.customersRepository.findOneBy({ id });
    if(!customerExists){
      throw new BadRequestException(`Does not exist a customer with id: ${id}`);
    }

    return await this.customersRepository.update({ id }, updateCustomerDto);
  }

  async remove(id: number) {
    const customerExists = await this.customersRepository.findOneBy({ id });
    if(!customerExists){
      throw new BadRequestException(`Does not exist a customer with id: ${id}`);
    }

    return await this.customersRepository.delete({ id });
  }
}

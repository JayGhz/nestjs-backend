import { Type } from "class-transformer";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, MinLength, ValidateNested } from "class-validator";
import { CreateCustomerDto } from "../../customers/dto/create-customer.dto";
import { CreateShelterDto } from "../../shelters/dto/create-shelter.dto";
import { CreateVetDto } from "../../vets/dto/create-vet.dto";

export class CreateUserDto {

    @IsNotEmpty({ message: 'Username is required' })
    userName: string;

    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid email' })
    email: string;

    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    password: string;

    @ValidateNested()
    @Type(() => CreateCustomerDto)
    @IsOptional()
    customer?: CreateCustomerDto;

    @ValidateNested()
    @Type(() => CreateVetDto)
    @IsOptional()
    vet?: CreateVetDto;

    @ValidateNested()
    @Type(() => CreateShelterDto)
    @IsOptional()
    shelter?: CreateShelterDto;
}

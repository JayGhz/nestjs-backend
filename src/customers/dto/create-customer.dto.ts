import { IsNotEmpty, MinLength } from "class-validator";

export class CreateCustomerDto {

    @IsNotEmpty({ message: 'First name is required' })
    firstName: string;

    @IsNotEmpty({ message: 'Last name is required' })
    lastName: string;

    @IsNotEmpty({ message: 'Phone number is required' })
    @MinLength(9, { message: 'Phone number must be at least 9 characters long' })
    phoneNumber: string;

    @IsNotEmpty({ message: 'Address is required' })
    address: string;
}

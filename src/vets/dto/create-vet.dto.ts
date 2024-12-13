import { IsEnum, IsNotEmpty, MinLength } from "class-validator";
import { Especialty } from "src/shared/enums/especialty.enum";

export class CreateVetDto {

    @IsNotEmpty({ message: 'First name is required' })
    firstName: string;

    @IsNotEmpty({ message: 'Last name is required' })
    lastName: string;

    @IsNotEmpty({ message: 'Phone number is required' })
    @MinLength(9, { message: 'Phone number must be at least 9 characters long' })
    phoneNumber: string;

    @IsNotEmpty({ message: 'Institution is required' })
    institution: string;

    @IsNotEmpty({ message: 'Especialty is required' })
    @IsEnum(Especialty, { message: 'Invalid especialty' })
    especialty: Especialty;

    @IsNotEmpty({ message: 'License number is required' })
    licensNumber: string;

}

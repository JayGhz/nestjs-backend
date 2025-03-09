import { IsNotEmpty, MinLength } from "class-validator";

export class CreateShelterDto {

    @IsNotEmpty({ message: 'The Chelter requires a name' })
    @MinLength(3, { message: 'The Chelter name must be at least 3 characters long' })
    shelterName: string;

    @IsNotEmpty({ message: 'The Chelter requires a location' })
    location: string;

    @IsNotEmpty({ message: 'The Chelter requires a capacity' })
    capacityAnimals: number;

    @IsNotEmpty({ message: 'RUC is required' })
    @MinLength(11, { message: 'RUC must be 11 characters long' })
    ruc: string;

    userId: number;

}

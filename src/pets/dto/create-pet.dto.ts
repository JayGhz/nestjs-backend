import { IsNotEmpty } from "class-validator";

export class CreatePetDto {
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @IsNotEmpty({ message: 'Breed  is required' })
    breedName: string;
}

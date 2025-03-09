import { Specie } from "@/shared/enums/specie.enum";
import { IsNotEmpty } from "class-validator";

export class CreateBreedDto {

    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @IsNotEmpty({ message: 'Description is required' })
    description: string;

    @IsNotEmpty({ message: 'Specie is required' })
    specie: Specie;
}

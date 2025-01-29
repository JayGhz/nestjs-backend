import { IsNotEmpty } from "class-validator";
import { Specie } from "src/shared/enums/specie.enum";

export class CreateBreedDto {

    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @IsNotEmpty({ message: 'Description is required' })
    description: string;

    @IsNotEmpty({ message: 'Specie is required' })
    specie: Specie;
}

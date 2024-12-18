import { Expose } from "class-transformer";

export class ShelterDetailsDto {
  @Expose()
  shelterName: string;

  @Expose()
  location: string;
  
  @Expose()
  capacityAnimals: number;

  @Expose()
  ruc: string
}

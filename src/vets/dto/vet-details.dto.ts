import { Expose } from "class-transformer";
import { Especialty } from "@/shared/enums/especialty.enum";

export class VetDetailsDto {
    @Expose()
    firstName: string;

    @Expose()
    lastName: string;

    @Expose()
    phoneNumber: string;
    
    @Expose()
    institution: string;
    
    @Expose()
    especialty: Especialty
    
    @Expose()
    licenseNumber: string;
}
  
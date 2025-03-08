import { Expose } from "class-transformer";
import { CustomerDetailsDto } from "../../customers/dto/customer-details.dto";
import { Role } from "../../shared/enums/role.enum";
import { ShelterDetailsDto } from "../../shelters/dto/shelter-details.dto";
import { VetDetailsDto } from "../../vets/dto/vet-details.dto";

export class userProfileDto {
  @Expose()
  userName: string;

  @Expose()
  email: string;

  @Expose()
  role: Role;

  @Expose()
  customerDetails?: CustomerDetailsDto;

  @Expose()
  vetDetails?: VetDetailsDto;
  
  @Expose()
  shelterDetails?: ShelterDetailsDto;
}

  
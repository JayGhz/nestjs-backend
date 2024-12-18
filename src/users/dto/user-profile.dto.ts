import { Expose } from "class-transformer";
import { CustomerDetailsDto } from "src/customers/dto/customer-details.dto";
import { Role } from "src/shared/enums/role.enum";
import { ShelterDetailsDto } from "src/shelters/dto/shelter-details.dto";
import { VetDetailsDto } from "src/vets/dto/vet-details.dto";

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

  
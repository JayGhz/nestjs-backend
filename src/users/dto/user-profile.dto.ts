import { CustomerDetailsDto } from "src/customers/dto/customer-details.dto";
import { Role } from "src/shared/enums/role.enum";
import { ShelterDetailsDto } from "src/shelters/dto/shelter-details.dto";
import { VetDetailsDto } from "src/vets/dto/vet-details.dto";

export class userProfileDto {
  userName: string;
  email: string;
  role: Role;
  customerDetails?: CustomerDetailsDto;
  vetDetails?: VetDetailsDto;
  shelterDetails?: ShelterDetailsDto;
}

  
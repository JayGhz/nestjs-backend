import { Expose } from "class-transformer";

export class CustomerDetailsDto {
    @Expose()
    firstName: string;

    @Expose()
    lastName: string;

    @Expose()
    phoneNumber: string;

    @Expose()
    address: string;
  }
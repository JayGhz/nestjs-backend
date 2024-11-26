import { CreateUserDto } from "./create-user.dto";

export type UpdateUserDto = Partial<CreateUserDto> & {
    firstName?: string;
    lastName?: string;
    bio?: string;
    shippingAddress?: string;
};

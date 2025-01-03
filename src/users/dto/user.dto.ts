import { Expose } from "class-transformer";
import { Role } from "src/shared/enums/role.enum";

export class UserDto {
    @Expose()
    id: number;

    @Expose()
    userName: string;

    @Expose()
    email: string;

    @Expose()
    role: Role;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
}
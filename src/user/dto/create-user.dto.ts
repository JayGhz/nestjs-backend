import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsEmail({}, { message: "Invalid email" })
    email: string;

    @IsString()
    @MinLength(8, { message: "Password must be at least 8 characters long" })
    password: string;
    
    @IsNotEmpty({ message: "First name is required" })
    firstName: string;

    @IsNotEmpty({ message: "Last name is required" })
    lastName: string;
    
    @Expose()
    @IsOptional()
    bio?: string;

    @Expose()
    @IsOptional()
    shippingAddress?: string;
};

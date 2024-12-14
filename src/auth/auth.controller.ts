import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signin')
  signIn() {
    return this.authService.signIn();
  }

  @Post('register-customer')
  registerCustomer(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.registerCustomer(createUserDto);
  }

  @Post('register-vet')
  registerVet(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.registerVet(createUserDto);
  }

  @Post('register-shelter')
  registerShelter(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.registerShelter(createUserDto);
  }

}

import { Controller, Post, Body, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SignInDto } from './dto/sign-in.dto';
import { Auth } from '../shared/decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(signInDto);
  }

  @Post('register-customer')
  registerCustomer(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerCustomer(createUserDto);
  }

  @Post('register-vet')
  registerVet(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerVet(createUserDto);
  }

  @Post('register-shelter')
  registerShelter(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerShelter(createUserDto);
  }

  @Get('profile')
  @Auth()
  getProfile(@Req() req) {
    const { email } = req.user.email;
    return this.authService.getProfile(email);
  }
}

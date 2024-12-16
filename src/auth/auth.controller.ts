import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { SignInDto } from './dto/sign-in.dto';
import { AuthGuard } from './guards/auth.guard';
import { Roles } from './decorators/role.decorator';
import { Role } from 'src/shared/enums/role.enum';
import { RoleGuard } from './guards/role.guard';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(signInDto);
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

  @Get('profile')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  getProfile(@Req() req) {
    return this.authService.getProfile(req.user);
  }
}

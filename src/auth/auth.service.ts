import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PasswordService } from '../shared/password/password.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { userProfileDto } from '../users/dto/user-profile.dto';


@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
  ) { }

  async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {

    const { email, password } = signInDto;
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.passwordService.comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { id:user.id, email: user.email, role: user.role };
    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }


  async registerCustomer(createUserDto: CreateUserDto): Promise<userProfileDto> {
    const hashedPassword = await this.passwordService.hashPassword(createUserDto.password);
    createUserDto.password = hashedPassword;
    return await this.usersService.registerCustomer(createUserDto);
  }

  async registerVet(createUserDto: CreateUserDto): Promise<userProfileDto> {
    const hashedPassword = await this.passwordService.hashPassword(createUserDto.password);
    createUserDto.password = hashedPassword;
    return await this.usersService.registerVet(createUserDto);
  }

  async registerShelter(createUserDto: CreateUserDto): Promise<userProfileDto> {
    const hashedPassword = await this.passwordService.hashPassword(createUserDto.password);
    createUserDto.password = hashedPassword;
    return await this.usersService.registerShelter(createUserDto);
  }

  async getProfile(email: string): Promise<userProfileDto> {
    return await this.usersService.getProfile(email);
  }

}

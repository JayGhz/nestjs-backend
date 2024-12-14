import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PasswordService } from 'src/shared/password/password.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/sign-in.dto';


@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly passwordService: PasswordService,
  ) { }

  async signIn(signInDto: SignInDto) {

    const { email, password } = signInDto;
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.passwordService.comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return 'User logged in';
  }


  async registerCustomer(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await this.passwordService.hashPassword(createUserDto.password);
    createUserDto.password = hashedPassword;
    return await this.usersService.registerCustomer(createUserDto);
  }

  async registerVet(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await this.passwordService.hashPassword(createUserDto.password);
    createUserDto.password = hashedPassword;
    return await this.usersService.registerVet(createUserDto);
  }

  async registerShelter(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await this.passwordService.hashPassword(createUserDto.password);
    createUserDto.password = hashedPassword;
    return await this.usersService.registerShelter(createUserDto);
  }
}

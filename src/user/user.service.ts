import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Author, Customer, User, Role } from '@prisma/client';
import { UserProfileDto } from './dto/user-profile.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  private async createUserWithRole(email: string, password: string, roleName: string) {
    const existingUser = await this.prismaService.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const role = await this.prismaService.role.findUnique({ where: { name: roleName } });
    if (!role) {
      throw new BadRequestException(`Role ${roleName} does not exist`);
    }

    return this.prismaService.user.create({
      data: {
        email,
        password,
        roleId: role.id,
      },
    });
  }

  private async buildResponse(user: User & { role: Role; authors?: Author; customers?: Customer }): Promise<UserProfileDto> {
    const userProfileDto = new UserProfileDto();

    userProfileDto.id = user.id;
    userProfileDto.email = user.email;
    userProfileDto.role = user.role.name;

    if (user.role.name === 'CUSTOMER' && user.customers) {
      userProfileDto.firstName = user.customers.firstName;
      userProfileDto.lastName = user.customers.lastName;
      userProfileDto.shippingAddress = user.customers.shippingAddress;
    } else if (user.role.name === 'AUTHOR' && user.authors) {
      userProfileDto.firstName = user.authors.firstName;
      userProfileDto.lastName = user.authors.lastName;
      userProfileDto.bio = user.authors.bio;
    }

    return userProfileDto;
  }

  async registerCustomer(createCustomerDto: CreateUserDto) {
    const newUser = await this.createUserWithRole(createCustomerDto.email, createCustomerDto.password, 'CUSTOMER');

    await this.prismaService.customer.create({
      data: {
        userId: newUser.id,
        firstName: createCustomerDto.firstName,
        lastName: createCustomerDto.lastName,
        shippingAddress: createCustomerDto.shippingAddress,
      },
    });

    const userWithRole = await this.prismaService.user.findUnique({
      where: { id: newUser.id },
      include: {
        role: true,
        customers: true,
      },
    });

    return this.buildResponse(userWithRole);
  }

  async registerAuthor(createAuthorDto: CreateUserDto) {
    const newUser = await this.createUserWithRole(createAuthorDto.email, createAuthorDto.password, 'AUTHOR');

    await this.prismaService.author.create({
      data: {
        userId: newUser.id,
        firstName: createAuthorDto.firstName,
        lastName: createAuthorDto.lastName,
        bio: createAuthorDto.bio,
      },
    });

    const userWithRole = await this.prismaService.user.findUnique({
      where: { id: newUser.id },
      include: {
        role: true,
        authors: true,
      },
    });

    return this.buildResponse(userWithRole);
  }

  async findAll(): Promise<UserProfileDto[]> {
    const users = await this.prismaService.user.findMany({
      include: {
        role: true,
        authors: true,
        customers: true,
      },
    });

    return Promise.all(users.map(user => this.buildResponse(user)));
  }

  async findOne(id: number): Promise<UserProfileDto> {
    const userFound = await this.prismaService.user.findUnique({
      where: { id },
      include: {
        role: true,
        customers: true,
        authors: true,
      },
    });

    if (!userFound) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return this.buildResponse(userFound);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userToUpdate = await this.prismaService.user.findUnique({
      where: { id },
      include: {
        role: true,
        authors: true,
        customers: true,
      },
    });

    if (!userToUpdate) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    const updateData: any = {
      email: updateUserDto.email,
      password: updateUserDto.password,
    };

    if (updateUserDto.shippingAddress || updateUserDto.firstName || updateUserDto.lastName) {
      updateData.customers = {
        update: {
          firstName: updateUserDto.firstName,
          lastName: updateUserDto.lastName,
          shippingAddress: updateUserDto.shippingAddress,
          updatedAt: new Date(),
        },
      };
    }

    if (updateUserDto.bio || updateUserDto.firstName || updateUserDto.lastName) {
      if (userToUpdate.authors) {
        updateData.authors = {
          update: {
            firstName: updateUserDto.firstName,
            lastName: updateUserDto.lastName,
            bio: updateUserDto.bio,
            updatedAt: new Date(),
          },
        };
      }
    }

    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data: updateData,
      include: {
        role: true,
        authors: true,
        customers: true,
      },
    });

    return this.buildResponse(updatedUser);
  }

  async remove(id: number) {
    const userToDelete = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!userToDelete) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return this.prismaService.user.delete({
      where: { id },
    });
  }
}

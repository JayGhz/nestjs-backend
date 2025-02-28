import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { UserActiveInterface } from '../shared/interfaces/user-active.interface';
import { ActiveUser } from '../shared/decorators/active-user.decorator';
import { Auth } from '../auth/decorators/auth.decorator';


@Auth()
@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) { }

  @Post()
  create(@Body() createPetDto: CreatePetDto, @ActiveUser() user: UserActiveInterface) {
    return this.petsService.create(createPetDto, user);
  }

  @Get()
  findAll() {
    return this.petsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.petsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePetDto: UpdatePetDto) {
    return this.petsService.update(id, updatePetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.petsService.remove(id);
  }
}

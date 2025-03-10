import { Auth } from '@/auth/decorators/auth.decorator';
import { BreedsService } from '@/breeds/breeds.service';
import { CreateBreedDto } from '@/breeds/dto/create-breed.dto';
import { UpdateBreedDto } from '@/breeds/dto/update-breed.dto';
import { Role } from '@/shared/enums/role.enum';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';


@Auth(Role.ADMIN)
@Controller('breeds')
export class BreedsController {
  constructor(private readonly breedsService: BreedsService) {}

  @Post()
  create(@Body() createBreedDto: CreateBreedDto) {
    return this.breedsService.create(createBreedDto);
  }

  @Get()
  findAll() {
    return this.breedsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.breedsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateBreedDto: UpdateBreedDto) {
    return this.breedsService.update(id, updateBreedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.breedsService.remove(id);
  }
}

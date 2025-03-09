import { Auth } from '@/auth/decorators/auth.decorator';
import { Role } from '@/shared/enums/role.enum';
import { CreateShelterDto } from '@/shelters/dto/create-shelter.dto';
import { UpdateShelterDto } from '@/shelters/dto/update-shelter.dto';
import { SheltersService } from '@/shelters/shelters.service';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';


Auth(Role.ADMIN)
@Controller('shelters')
export class SheltersController {
  constructor(private readonly sheltersService: SheltersService) { }

  @Post()
  create(@Body() createShelterDto: CreateShelterDto) {
    return this.sheltersService.create(createShelterDto);
  }

  @Get()
  findAll() {
    return this.sheltersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sheltersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShelterDto: UpdateShelterDto) {
    return this.sheltersService.update(+id, updateShelterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sheltersService.remove(+id);
  }
}

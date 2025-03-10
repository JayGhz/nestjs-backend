import { Auth } from '@/auth/decorators/auth.decorator';
import { Role } from '@/shared/enums/role.enum';
import { CreateVetDto } from '@/vets/dto/create-vet.dto';
import { UpdateVetDto } from '@/vets/dto/update-vet.dto';
import { VetsService } from '@/vets/vets.service';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';


@Auth(Role.ADMIN)
@Controller('vets')
export class VetsController {
  constructor(private readonly vetsService: VetsService) {}

  @Post()
  create(@Body() createVetDto: CreateVetDto) {
    return this.vetsService.create(createVetDto);
  }

  @Get()
  findAll() {
    return this.vetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vetsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVetDto: UpdateVetDto) {
    return this.vetsService.update(+id, updateVetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vetsService.remove(+id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Roles } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/auth/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('answer')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post()
  create(@Body() createAnswerDto: CreateAnswerDto) {
    return this.answerService.create(createAnswerDto);
  }

  @Get()
  findAll() {
    return this.answerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.answerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answerService.update(+id, updateAnswerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.answerService.remove(+id);
  }
}

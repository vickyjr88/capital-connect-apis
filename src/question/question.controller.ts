import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, HttpCode, HttpStatus, NotFoundException, BadRequestException } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';
import throwInternalServer from 'src/utils/exceptions.util';
import { SubsectionService } from 'src/subsection/subsection.service';

@Controller('questions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class QuestionController {
  constructor(
    private readonly questionService: QuestionService,
    private readonly subsectionService: SubsectionService
  ) {}

  @Post()
  @Roles(Role.Admin)
  async create(@Body() createQuestionDto: CreateQuestionDto) {
    try {
      await this.subsectionService.findOne(createQuestionDto.subSectionId);
      return this.questionService.create(createQuestionDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new BadRequestException('Question must be associated with an existing subsection.');
      }
      throwInternalServer(error)
    }
  }

  @Get()
  findAll() {
    try {
      return this.questionService.findAll();
    } catch (error) {
      throwInternalServer(error)
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.questionService.findOne(+id);
    } catch (error) {
      throwInternalServer(error)
    }
  }

  @Put(':id')
  @Roles(Role.Admin)
  async update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    try {
      await this.questionService.findOne(+id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new BadRequestException(`Question with id ${id} not found`);
      }
      throwInternalServer(error)
    }

    try {
      if (updateQuestionDto.subSectionId) {
        await this.subsectionService.findOne(updateQuestionDto.subSectionId);
      }

      const answer = await this.questionService.update(+id, updateQuestionDto);
      return answer;
    } catch (error) {
      console.log(error);
      if (error instanceof NotFoundException) {
        throw new BadRequestException('Question must be associated with an existing sub section.');
      }
      throwInternalServer(error)
    }
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.questionService.remove(+id);
  }
}

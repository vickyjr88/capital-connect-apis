import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { CreateSubmissionDto, CreateMultipleSubmissionsDto } from './dto/create-submission.dto';
import { Submission } from './entities/submission.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

@Controller('submissions')
@Controller('answers')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  @Post()
  @Roles(Role.User)
  async create(@Body() createSubmissionDto: CreateSubmissionDto): Promise<Submission> {
    const submission = new Submission();
    submission.user = { id: createSubmissionDto.userId } as any; // Simplified for example purposes
    submission.question = { id: createSubmissionDto.questionId } as any;
    submission.answer = { id: createSubmissionDto.answerId } as any;
    return this.submissionService.create(submission);
  }

  @Post('bulk')
  @Roles(Role.User)
  async createMultiple(@Body() createMultipleSubmissionsDto: CreateMultipleSubmissionsDto): Promise<Submission[]> {
    const submissions = createMultipleSubmissionsDto.submissions.map(dto => {
      const submission = new Submission();
      submission.user = { id: dto.userId } as any; // Simplified for example purposes
      submission.question = { id: dto.questionId } as any;
      submission.answer = { id: dto.answerId } as any;
      return submission;
    });
    return this.submissionService.createMultiple(submissions);
  }

  @Get('user/:userId')
  async findByUser(@Param('userId') userId: string): Promise<Submission[]> {
    return this.submissionService.findByUser(+userId);
  }

  @Get('user/:userId/score')
  async calculateScore(@Param('userId') userId: string): Promise<{ score: number }> {
    const score = await this.submissionService.calculateScore(+userId);
    return { score };
  }
}

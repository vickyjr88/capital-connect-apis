import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Request,
  UnauthorizedException,
  Put,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { SubmissionService } from './submission.service';
import {
  CreateSubmissionDto,
  CreateMultipleSubmissionsDto,
} from './dto/create-submission.dto';
import { Submission } from './entities/submission.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import throwInternalServer from 'src/shared/utils/exceptions.util';
import { SectionService } from 'src/section/section.service';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { User } from '../users/entities/user.entity';
import { Question } from '../question/entities/question.entity';
import { Answer } from '../answer/entities/answer.entity';

@Controller('submissions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SubmissionController {
  constructor(
    private readonly submissionService: SubmissionService,
    private readonly sectionService: SectionService,
  ) {}

  @Post()
  @Roles(Role.User, Role.Investor)
  async create(
    @Request() req,
    @Body() createSubmissionDto: CreateSubmissionDto,
  ): Promise<Submission> {
    try {
      if (createSubmissionDto.userId !== req.user.id) {
        throw new UnauthorizedException(
          'You are not authorized to respond on behalf of this user.',
        );
      }
      const check = await this.submissionService.findSubmission(
        createSubmissionDto.userId,
        createSubmissionDto.questionId,
        createSubmissionDto.answerId,
      );
      if (check) {
        check.text = createSubmissionDto.text;
        return this.submissionService.update(check.id, check);
      } else {
        // Create a new submission
        const submission = new Submission();
        submission.user = { id: createSubmissionDto.userId } as any; // Simplified for example purposes
        submission.question = { id: createSubmissionDto.questionId } as any;
        submission.answer = { id: createSubmissionDto.answerId } as any;
        submission.text = createSubmissionDto.text;
        return this.submissionService.create(submission);
      }
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throwInternalServer(error);
    }
  }

  @Post('bulk')
  @Roles(Role.User, Role.Investor)
  async createMultiple(
    @Request() req,
    @Body() createMultipleSubmissionsDto: CreateMultipleSubmissionsDto,
  ): Promise<Submission[]> {
    try {
      const submissionPromises = createMultipleSubmissionsDto.submissions.map(
        async (dto) => {
          if (dto.userId !== req.user.id) {
            throw new UnauthorizedException(
              'You are not authorized to respond on behalf of this user.',
            );
          }

          const check = await this.submissionService.findSubmission(
            dto.userId,
            dto.questionId,
            dto.answerId,
          );

          if (check) {
            check.text = dto.text;
            return this.submissionService.update(check.id, check);
          } else {
            const submission = new Submission();
            submission.user = { id: dto.userId } as User;
            submission.question = { id: dto.questionId } as Question;
            submission.answer = { id: dto.answerId } as Answer;
            submission.text = dto.text;

            return this.submissionService.create(submission);
          }
        },
      );

      const submissions = await Promise.all(submissionPromises);
      return submissions;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throwInternalServer(error);
    }
  }

  @Put(':id')
  @Roles(Role.User, Role.Investor)
  async update(
    @Param('id') id: string,
    @Body() updateSubmissionDto: UpdateSubmissionDto,
  ) {
    try {
      const submission = await this.submissionService.findOne(+id);
      if (!submission) {
        throw new NotFoundException(`Submission with id ${id} not found`);
      }
      const updatedSubmission = await this.submissionService.update(
        +id,
        updateSubmissionDto,
      );
      return updatedSubmission;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new BadRequestException(`Submission with id ${id} not found`);
      }
      throwInternalServer(error);
    }
  }

  @Get('user/:userId')
  async findByUser(@Param('userId') userId: string): Promise<Submission[]> {
    try {
      return await this.submissionService.findByUser(+userId);
    } catch (error) {
      throwInternalServer(error);
    }
  }

  @Get('user/:userId/section/:sectionId')
  async findByUserPerSection(
    @Param('userId') userId: string,
    @Param('sectionId') sectionId: string,
  ): Promise<Submission[]> {
    try {
      return await this.submissionService.findByUserPerSection(
        +userId,
        +sectionId,
      );
    } catch (error) {
      throwInternalServer(error);
    }
  }

  @Get('user/:userId/score')
  async calculateScore(
    @Param('userId') userId: string,
  ): Promise<{ score: number }> {
    try {
      const score = await this.submissionService.calculateScore(+userId);
      return { score };
    } catch (error) {
      throwInternalServer(error);
    }
  }

  @Get('user/:userId/score/:sectionId')
  async calculateScorePerSection(
    @Param('userId') userId: string,
    @Param('sectionId') sectionId: string,
  ): Promise<{ score: number }> {
    try {
      const score = await this.submissionService.calculateScorePerSection(
        +userId,
        +sectionId,
      );
      return score;
    } catch (error) {
      throwInternalServer(error);
    }
  }

  @Get('user/:userId/scores')
  async calculateScores(@Param('userId') userId: string): Promise<any[]> {
    try {
      const sections = await this.sectionService.findAll();
      const scores = [];
      for (const section of sections) {
        const score = await this.submissionService.calculateScorePerSection(
          +userId,
          section.id,
        );

        scores.push({ ...section, ...score });
      }
      return scores;
    } catch (error) {
      throwInternalServer(error);
    }
  }
}

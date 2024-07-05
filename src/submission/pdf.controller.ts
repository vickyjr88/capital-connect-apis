import { Controller, Get, Res, Query, Inject, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { PdfService } from './pdf.service';
import { SubmissionService } from './submission.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import throwInternalServer from 'src/shared/utils/exceptions.util';

@UseGuards(JwtAuthGuard)
@Controller('pdf')
export class PdfController {
  constructor(
    private readonly pdfService: PdfService,
    private readonly submissionService: SubmissionService
  ) {}

  @Get('report')
  async generateReport(@Query('userId') userId: string, @Res() res: Response) {
    try {
    const responses = await this.submissionService.findByUser(+userId);
    this.pdfService.generateReport(responses, res);
    } catch (error) {
      console.log(error);
      throwInternalServer(error)
    }
  }
}

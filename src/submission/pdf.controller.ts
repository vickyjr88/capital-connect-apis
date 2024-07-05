import { Controller, Get, Res, Query, Inject, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { PdfService } from './pdf.service';
import { SubmissionService } from './submission.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('pdf')
export class PdfController {
  constructor(
    private readonly pdfService: PdfService,
    private readonly submissionService: SubmissionService
  ) {}

  @Get('report')
  async generateReport(@Query('userId') userId: string, @Res() res: Response) {
    const responses = await this.submissionService.findByUser(+userId);
    this.pdfService.generateReport(responses, res);
  }
}

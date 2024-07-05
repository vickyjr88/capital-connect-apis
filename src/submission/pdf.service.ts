import { Injectable } from '@nestjs/common';
import * as ejs from 'ejs';
import * as htmlPdf from 'html-pdf';
import { Response } from 'express';
import * as path from 'path';
import { Answer } from 'src/answer/entities/answer.entity';
import { Submission } from './entities/submission.entity';

@Injectable()
export class PdfService {
  async generateReport(responses: Submission[], res: Response) {
    const templatePath = path.join(__dirname, '../../', 'templates', 'report-template.ejs');
    console.log(responses);
    const html = await ejs.renderFile(templatePath, { responses: responses });

    htmlPdf.create(html).toStream((err, stream) => {
      if (err) {
        res.status(500).send(err);
        return;
      }

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=report-${Date.now()}.pdf`);

      stream.pipe(res);
    });
  }
}

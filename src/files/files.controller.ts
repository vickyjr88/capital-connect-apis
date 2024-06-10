import { BadRequestException, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';


@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}


  @Post('upload-logo')
  @UseInterceptors(FileInterceptor('logo', { 
    storage: diskStorage({
      destination: './uploads/company-logos',
      filename: (req, file, cb) => {
        const name = file.originalname.split(".")[0];
        const fileExtension = extname(file.originalname);
        const newFileName = name.split(" ").join("_") + "." + fileExtension;
        cb(null, newFileName)
      }
    }),
    fileFilter: (req, file, cb) => {
      if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new BadRequestException('Wrong file format. Please upload an image file'), false);
      }
      cb(null, true)
    }
   }))
  uploadLogo(@UploadedFile() logo: Express.Multer.File) {
    console.log(logo)
  }



  @Get('logo/:filename')
  async getLogo(@Param('filename') filename, @Res() res: Response) {
    const fileFound = await this.filesService.findBusinessLogo(filename);
    try {
      if (fileFound) {
        return res.sendFile(fileFound, {root: './uploads/company-logos'})
      }
    } catch (error) {
      return error.message;
    }
  }


}

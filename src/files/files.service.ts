import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as util from 'util';

@Injectable()
export class FilesService {
    private readonly readdir = util.promisify(fs.readdir);

    async findBusinessLogo(filename: string): Promise<string | null> {
        const dir = './uploads/company-logos';
        const logoName = filename.split(" ").join("_");
        try {
            const files = await this.readdir(dir);
            for (const file of files) {
                if (file.indexOf(logoName) != -1) {
                    return file;
                }
            }
            throw new NotFoundException('Logo not found')
        } catch (error) {
            console.error('Error trying to read file directory', error);
            throw error;
        }
    }

}

import { Injectable } from '@nestjs/common';
import { CreateSubsectionDto } from './dto/create-subsection.dto';
import { UpdateSubsectionDto } from './dto/update-subsection.dto';

@Injectable()
export class SubsectionService {
  create(createSubsectionDto: CreateSubsectionDto) {
    return 'This action adds a new subsection';
  }

  findAll() {
    return `This action returns all subsection`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subsection`;
  }

  update(id: number, updateSubsectionDto: UpdateSubsectionDto) {
    return `This action updates a #${id} subsection`;
  }

  remove(id: number) {
    return `This action removes a #${id} subsection`;
  }
}

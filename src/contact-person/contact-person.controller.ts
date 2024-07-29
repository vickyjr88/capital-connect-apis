import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContactPersonService } from './contact-person.service';
import { CreateContactPersonDto } from './dto/create-contact-person.dto';
import { UpdateContactPersonDto } from './dto/update-contact-person.dto';

@Controller('contact-persons')
export class ContactPersonController {
  constructor(private readonly contactPersonService: ContactPersonService) {}

  @Post()
  create(@Body() createContactPersonDto: CreateContactPersonDto) {
    return this.contactPersonService.create(createContactPersonDto);
  }

  @Get()
  findAll() {
    return this.contactPersonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactPersonService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactPersonDto: UpdateContactPersonDto) {
    return this.contactPersonService.update(+id, updateContactPersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactPersonService.remove(+id);
  }
}

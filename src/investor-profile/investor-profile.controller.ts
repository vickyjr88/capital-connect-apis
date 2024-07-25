import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { InvestorProfileService } from './investor-profile.service';
import { CreateInvestorProfileDto } from './dto/create-investor-profile.dto';
import { UpdateInvestorProfileDto } from './dto/update-investor-profile.dto';

@Controller('investor-profiles')
export class InvestorProfileController {
  constructor(
    private readonly investorProfileService: InvestorProfileService,
  ) {}

  @Post()
  create(@Body() createInvestorProfileDto: CreateInvestorProfileDto) {
    return this.investorProfileService.create(createInvestorProfileDto);
  }

  @Get()
  findAll() {
    return this.investorProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.investorProfileService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateInvestorProfileDto: UpdateInvestorProfileDto,
  ) {
    return this.investorProfileService.update(+id, updateInvestorProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.investorProfileService.remove(+id);
  }
}

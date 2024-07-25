import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { InvestorProfileService } from './investor-profile.service';
import { CreateInvestorProfileDto } from './dto/create-investor-profile.dto';
import { UpdateInvestorProfileDto } from './dto/update-investor-profile.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import throwInternalServer from 'src/shared/utils/exceptions.util';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('investor-profiles')
export class InvestorProfileController {
  constructor(
    private readonly investorProfileService: InvestorProfileService,
  ) {}

  @Roles(Role.Investor)
  @Post()
  create(
    @Request() req,
    @Body() createInvestorProfileDto: CreateInvestorProfileDto,
  ) {
    try {
      const user = req.user;
      if (!user.roles.includes('investor')) {
        throw new BadRequestException(
          'User not allowed to create investor profile.',
        );
      }
      return this.investorProfileService.create(createInvestorProfileDto);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throwInternalServer(error);
    }
  }

  @Roles(Role.Admin, Role.Investor, Role.Advisor)
  @Get()
  findAll() {
    return this.investorProfileService.findAll();
  }

  @Roles(Role.Admin, Role.Investor, Role.Advisor)
  @Get(':id')
  async findOne(@Request() req, @Param('id') id: string) {
    try {
      const investorProfile = await this.investorProfileService.findOne(+id);
      const user = req.user;
      if (
        user.roles.includes('investor') &&
        investorProfile.user.id !== user.id
      ) {
        throw new BadRequestException(
          'User not allowed to view investor profile.',
        );
      }
      return investorProfile;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throwInternalServer(error);
    }
  }

  @Roles(Role.Admin, Role.Investor)
  @Put(':id')
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateInvestorProfileDto: UpdateInvestorProfileDto,
  ) {
    try {
      const investorProfile = await this.investorProfileService.findOne(+id);
      const user = req.user;
      if (
        user.roles.includes('investor') &&
        investorProfile.user.id !== user.id
      ) {
        throw new BadRequestException(
          'User not allowed to update investor profile.',
        );
      }
      return await this.investorProfileService.update(
        +id,
        updateInvestorProfileDto,
      );
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      } else if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throwInternalServer(error);
    }
  }

  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.investorProfileService.remove(+id);
  }
}

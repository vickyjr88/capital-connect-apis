import { Controller, Get, Post, Body, Param, Delete, UseGuards, Query, NotFoundException, BadRequestException, Put, HttpCode, HttpStatus } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import throwInternalServer from 'src/shared/utils/exceptions.util';

@Controller('payments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PaymentController {
  constructor(private readonly paymentsService: PaymentService) {}

  @Post()
  @Roles(Role.Admin)
  create(@Body() createPaymentDto: CreatePaymentDto) {  
    try {
      return this.paymentsService.createPayment(createPaymentDto);
    } catch (error) {
      throwInternalServer(error)
    }  
  }

  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.paymentsService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.paymentsService.findOne(+id);
    } catch (error) {
      throwInternalServer(error)
    }
  }

  @Put(':id')
  @Roles(Role.Admin)
  async update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    try {
      await this.paymentsService.findOne(+id);
      const payments = await this.paymentsService.update(+id, updatePaymentDto);
      return payments;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new BadRequestException(`Payment with id ${id} not found`);
      }
      throwInternalServer(error)
    }
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    try {
      await this.paymentsService.remove(+id);
    } catch (error) {
      throwInternalServer(error)
    }
  }
}

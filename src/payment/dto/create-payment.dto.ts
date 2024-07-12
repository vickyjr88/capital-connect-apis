import { IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { CreateDateColumn, UpdateDateColumn } from "typeorm";
export class CreatePaymentDto {
    @IsString()
    @MinLength(1)
    currency: string;

    @IsNumber()
    amount: number;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    status?: string;

    @IsNumber()
    OrderTrackingId: number;

   /* @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date; */

}

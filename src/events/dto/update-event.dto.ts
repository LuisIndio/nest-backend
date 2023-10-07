import { PartialType } from '@nestjs/mapped-types';
import { CreateEventDto } from './create-event.dto';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateEventDto {

    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsOptional()
    date: Date;
}

import { IsDate, IsDateString, IsISO8601, IsString,MinLength } from "class-validator";

export class CreateEventDto {

    @IsString()
    @MinLength(1)
    name: string;

    @IsString()
    @MinLength(1)
    description: string;

    @IsString()
    date: string;
}

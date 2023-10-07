import { IsDate, IsDateString, IsISO8601, IsInt, IsOptional, IsString,MinLength } from "class-validator";
import { User } from "src/users/entities/user.entity";

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

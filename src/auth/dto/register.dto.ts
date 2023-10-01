import { Transform } from "class-transformer";
import { IsString, Min, MinLength } from "class-validator";

export class RegisterDto {

    @Transform(({ value }) => value.trim())
    @IsString()
    name: string;

    @IsString()
    email: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(8)
    password: string;
}
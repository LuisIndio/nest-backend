import { Transform } from "class-transformer";
import { IsEmail, IsString, Min, MinLength } from "class-validator";

export class LoginDto{
    @IsEmail()
    email: string;
    
    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(8)
    password: string;
}
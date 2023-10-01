import { Body, Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { Request } from 'express';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guard/roles.guard';
import { User } from '../users/entities/user.entity';
import { Role } from '../Common/enums/rol.enum';
import { Auth } from './decorators/auth.decorator';
import { ActiveUser } from 'src/Common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/Common/interfaces/user-active.interface';
import { ApiTags } from '@nestjs/swagger';

interface RequestWithUser extends Request {
    user: {
        email: string;
        role: string;
    };
}
@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ){}

    @Post('register')
    register(
        @Body()
        registerDto: RegisterDto
    ){
        
        return this.authService.register(registerDto);
    }

    @Post('login')
    login(
        @Body()
        loginDto: LoginDto,){
        return this.authService.login(loginDto);
    }

    @Get('me')
    @Auth(Role.USER)
    profile(@ActiveUser() user: UserActiveInterface){
        return this.authService.profile(user);
    }
}

import { Injectable,BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async register({name,email,password}: RegisterDto) {

        const user = await this.userService.findOneByEmail(email);
        if (user) {
            throw new BadRequestException('User already exists');
        }
        await this.userService.create({name,email,password: await bcryptjs.hash(password, 10)});

        return {message: email + ' registered'}
    }
    
    async login({email,password}:LoginDto) {
        const user = await this.userService.findByEmailWithPassword(email)
        if(!user){
            throw new UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if(!isPasswordValid){
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {id: user.id, email: user.email,role: user.role};
        const token = await this.jwtService.signAsync(payload);

        return {token,
                email};
    }
    async profile({ email, role }: { email: string; role: string }) {
        return await this.userService.findOneByEmail(email);
    }
}

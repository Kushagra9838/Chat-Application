import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { LoginDto } from './dto/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { NotificationService } from 'src/notification/notification.service';


@Injectable()
export class AuthService {

    constructor(
        @InjectModel('User') private userModel: Model<User>,
        private jwtService: JwtService,
        private readonly notificationService: NotificationService
    ) { }


    async registerUser(userDto: UserDto) {
        const existingUser = await this.userModel.findOne({ email: userDto.email });
        if (existingUser) {
            throw new BadRequestException('Email already registered');
        }
        
        //Hash password
        const salt = 10;
        const hashPassword = await bcrypt.hash(userDto.password, salt);

        //Create new user
        const newUser = await this.userModel.create({
            ...userDto,
            password: hashPassword
        });
        if (!newUser) {
            return { message: "User cannot register" };
        }

        const { _id, name, email } = newUser;

        await this.notificationService.sendWelcomeEmail(email, name);

        return {
            message: 'User registered successfully',
            user: { _id, name, email },
        };
    }

    async loginUser(loginDto: LoginDto) {

        //Check credentials
        const user = await this.userModel.findOne({ email: loginDto.email });
        if (!user) {
            throw new UnauthorizedException('Wrong credentials');
        }
        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Wrong credentials');
        }

        //Create JWT token
        const payload = { sub: user._id, email: user.email };
        const token = this.jwtService.sign(payload)

        return {
            accessToken: token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            }
        }
    }
}

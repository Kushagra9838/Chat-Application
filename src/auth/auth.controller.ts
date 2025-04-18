import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppLogger } from 'src/logger/winston-logger.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly logger: AppLogger,
    ){}

    @Post('register')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: 201, description: 'User registered successfully' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    async registerUser(@Body() userDto: UserDto){
        this.logger.log(`Register attempt for email: ${userDto.email}`);
        return await this.authService.registerUser(userDto);
    }

    @Post('login')
    @ApiOperation({ summary: 'Login an existing user' })
    @ApiResponse({ status: 200, description: 'Login successful' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async loginUser(@Body() loginDto: LoginDto){
        this.logger.log(`Login attempt for email: ${loginDto.email}`);
        return await this.authService.loginUser(loginDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    @ApiOperation({ summary: 'Get the authenticated user' })
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'User data retrieved successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    getUser(@Request() req){
        this.logger.log(`Fetching current user with id: ${req.user._id}`);
        return req.user;
    }
}

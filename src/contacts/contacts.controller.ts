import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ReqContactDto } from './dto/request-contact.dto';
import { AcceptContactDto } from './dto/accept-contact.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppLogger } from 'src/logger/winston-logger.service';


@ApiTags('Contacts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('contacts')
export class ContactsController {

    constructor(private readonly contactsService: ContactsService,
        private readonly logger: AppLogger
    ) { }

    @Post('request')
    @ApiOperation({ summary: 'Send a contact request' })
    @ApiResponse({ status: 201, description: 'Contact request sent' })
    @ApiResponse({ status: 400, description: 'Request already sent' })
    sendRequest(@Body() reqContactDto: ReqContactDto) {
        this.logger.log(`Sending contact request from user ${reqContactDto.senderId} to user ${reqContactDto.receiverId}`);
        return this.contactsService.sendRequest(reqContactDto);
    }

    @Post('accept')
    @ApiOperation({ summary: 'Accept a contact request' })
    @ApiResponse({ status: 200, description: 'Contact request accepted' })
    @ApiResponse({ status: 404, description: 'No pending request found' })
    acceptRequest(@Body() resContactDto: ReqContactDto) {
        this.logger.log(`Accepting contact request from user ${resContactDto.senderId} to user ${resContactDto.receiverId}`);
        return this.contactsService.acceptRequest(resContactDto);
    }

    @Get()
    @ApiOperation({ summary: 'List all accepted contacts for a user' })
    @ApiQuery({ name: 'userId', required: true, description: 'User ID to get contacts for' })
    @ApiResponse({ status: 200, description: 'List of accepted contacts' })
    getContacts(@Query('userId') userId: string) {
        this.logger.log(`Fetching contacts for user ${userId}`);
        return this.contactsService.getContacts(userId);
    }

    @Post('send')
    @ApiOperation({ summary: 'Check if message can be sent to a contact' })
    @ApiResponse({ status: 200, description: 'Returns whether user can send message' })
    canMessage(@Body() acceptContactDto: AcceptContactDto) {
        this.logger.log(`Checking if user ${acceptContactDto.senderId} can send message to user ${acceptContactDto.receiverId}`);
        return this.contactsService.canMessage(acceptContactDto.senderId, acceptContactDto.receiverId);
    }
}

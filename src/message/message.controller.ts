import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { SendMessageDto } from './dto/send-message.dto';
import { MessageService } from './message.service';
import { User } from 'src/auth/decorators/user.decorators';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppLogger } from 'src/logger/winston-logger.service';
// import { getMessageDto } from './dto/get-message.dto';

@ApiTags('Messages')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('messages')
export class MessageController {

    constructor(private readonly messageService: MessageService,
        private readonly logger: AppLogger,
    ) { }

    @Post()
    @ApiOperation({ summary: 'Send a message to a contact' })
    @ApiResponse({ status: 201, description: 'Message sent successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid input or contact not accepted.' })
    sendMessage(@Body() sendMessageDto: SendMessageDto) {
        this.logger.log(`Sending message from user ${sendMessageDto.senderId} to contact ${sendMessageDto.receiverId}`);
        return this.messageService.sendMessage(sendMessageDto);
    }

    @Get(':contactId')
    @ApiOperation({ summary: 'Get paginated messages with a contact' })
    @ApiParam({ name: 'contactId', type: String, description: 'Contact user ID' })
    @ApiQuery({ name: 'page', type: Number, required: true })
    @ApiQuery({ name: 'limit', type: Number, required: true })
    @ApiResponse({ status: 200, description: 'List of messages' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    getMessages(
        @Param('contactId') contactId: string,
        @User('userId') senderId: string,
        @Query('page', ParseIntPipe) page: number,
        @Query('limit', ParseIntPipe) limit: number
    ) {
        this.logger.log(`Fetching messages for user ${senderId} with contact ${contactId}, page ${page}, limit ${limit}`);
        return this.messageService.getMessages(contactId, senderId, page, limit);
    }
}

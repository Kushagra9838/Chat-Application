import { ForbiddenException, Injectable } from '@nestjs/common';
import { SendMessageDto } from './dto/send-message.dto';
import { ContactsService } from 'src/contacts/contacts.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './schema/message.schema';
import { ThrottlerException } from '@nestjs/throttler';

@Injectable()
export class MessageService {

    constructor(
        private contactService: ContactsService,
        @InjectModel("Message") private messageModel: Model<Message>,
    ){}

    async sendMessage(dto: SendMessageDto) {
        const { senderId, receiverId, message } = dto;

        // Check if sender can message the receiver (reuse your contact logic)
        const Respnose = await this.contactService.canMessage(senderId, receiverId);
        const isAllowed = Respnose.canSend;
        if (!isAllowed) {
            throw new ForbiddenException('You cannot message this user');
        }

        // Rate limit logic here (5 per minute)
        const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
        const messagesLastMinute = await this.messageModel.countDocuments({
            senderId,
            createdAt: { $gte: oneMinuteAgo },
        });

        if (messagesLastMinute >= 5) {
            throw new ThrottlerException('Too many messages');
        }

        return await this.messageModel.create({ senderId, receiverId, message });
    }

    async getMessages(contactId: string, userId: string, page: number, limit: number) {
        const skip = (page - 1) * limit;
        return await this.messageModel.find({
          $or: [
            { senderId: userId, receiverId: contactId },
            { senderId: contactId, receiverId: userId },
          ],
        })
        .sort({createdAt: -1})
        .skip(skip)
        .limit(limit);
      }
}

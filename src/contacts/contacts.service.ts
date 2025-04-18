import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ReqContactDto } from './dto/request-contact.dto';
import { AcceptContactDto } from './dto/accept-contact.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact } from './schema/contacts.schema';
import { SendMessageDto } from './dto/send-message.dto';

@Injectable()
export class ContactsService {

    constructor(@InjectModel("Contact") private contactModel: Model<Contact>) { }

    async sendRequest(reqContactDto: ReqContactDto) {
        const existing = await this.contactModel.findOne({ sender: reqContactDto.senderId, receiver: reqContactDto.receiverId });
        if (existing) throw new BadRequestException('Request already sent');

        return this.contactModel.create({ sender: reqContactDto.senderId, receiver: reqContactDto.receiverId });
    }

    async acceptRequest(acceptContactDto: AcceptContactDto) {
        const contact = await this.contactModel.findOne({
            sender: acceptContactDto.receiverId,
            receiver: acceptContactDto.senderId,
            status: 'pending'
        })

        if (!contact) throw new NotFoundException('No pending request found');

        contact.status = 'accepted';
        return contact.save();
    }

    async getContacts(userId: string) {
        return await this.contactModel.find({
            $or: [
                { sender: userId },
                { receiver: userId }
            ],
            status: "accepted"
        })
    }

    async canMessage(senderId: string, receiverId: string) {

        const isContact = await this.contactModel.findOne({
            $or: [
                { sender: senderId, receiver: receiverId, status: 'accepted' },
                { sender: receiverId, receiver: senderId, status: 'accepted' },
            ],
        });

        return {
            canSend: !!isContact,
            message: isContact ? 'You can send messages to this user.' : 'You are not connected with this user.',
        };
    }

}

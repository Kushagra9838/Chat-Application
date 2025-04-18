import { Module } from '@nestjs/common';
import { ContactsModule } from 'src/contacts/contacts.module';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from './schema/message.schema';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
    imports:[
        LoggerModule,
        ContactsModule,
        MongooseModule.forFeature([{name: "Message", schema: MessageSchema}])
    ],
    providers: [MessageService],
    controllers: [MessageController]
})
export class MessageModule {
}

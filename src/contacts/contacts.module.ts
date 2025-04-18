import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactSchema } from './schema/contacts.schema';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: "Contact", schema: ContactSchema}]),
    LoggerModule
  ],
  providers: [ContactsService],
  controllers: [ContactsController],
  exports: [ContactsService]
})
export class ContactsModule {}

// src/app.module.ts
import { Module } from '@nestjs/common';
import { LoggerModule } from './logger/logger.module';  // Correct import
import { AuthModule } from './auth/auth.module'; 
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ContactsModule } from './contacts/contacts.module';
import { MessageModule } from './message/message.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    LoggerModule,  
    AuthModule,
    MongooseModule.forRoot("mongodb://localhost:27017/chatApplication"),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ContactsModule,
    MessageModule,
    NotificationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

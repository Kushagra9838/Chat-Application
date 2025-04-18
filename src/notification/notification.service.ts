import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NotificationService {
    private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('EMAIL'),
        pass: this.configService.get<string>('NODEMAILER_PASSWORD'),
      },
    });
  }
    
      async sendWelcomeEmail(to: string, name: string) {
        const mailOptions = {
          from: '"Chat App" <your-email@gmail.com>',
          to,
          subject: 'Welcome to Chat App 🎉',
          html: `<h1>Hi ${name}!</h1><p>Thanks for signing up. Let's chat! 💬</p>`,
        };
    
        try {
          const info = await this.transporter.sendMail(mailOptions);
        } catch (error) {
          console.error('Error sending email:', error);
        }
      }
    }


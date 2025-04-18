import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SendMessageDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  receiverId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  senderId: string;
}

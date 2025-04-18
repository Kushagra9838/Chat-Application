import { ApiProperty } from "@nestjs/swagger"

export class AcceptContactDto{

    @ApiProperty()
    senderId: string

    @ApiProperty()
    receiverId: string
}
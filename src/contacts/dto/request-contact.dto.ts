import { ApiProperty } from "@nestjs/swagger"

export class ReqContactDto{

    @ApiProperty()
    senderId: string

    @ApiProperty()
    receiverId: string
}
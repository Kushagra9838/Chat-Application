import { ApiProperty } from "@nestjs/swagger"

export class getMessageDto{

    @ApiProperty()
    receiverId: string

    @ApiProperty()
    limit: number

    @ApiProperty()
    page: number
}
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ContactDocument = Contact & Document;

@Schema({ timestamps: true })
export class Contact {
  @Prop({type: Types.ObjectId, ref: 'User', required: true})
  sender: Types.ObjectId;

  @Prop({type: Types.ObjectId, ref: 'User', required: true})
  receiver: Types.ObjectId;

  @Prop({type: String, enum: ['pending', 'accepted'], default: 'pending'})
  status: 'pending' | 'accepted';
}

export const ContactSchema = SchemaFactory.createForClass(Contact);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Reply extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  @Prop({ required: true })
  nickname: string;

  @Prop({ required: true })
  text: string;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: 0 })
  likes: number;
}

export const ReplySchema = SchemaFactory.createForClass(Reply);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Topic {
  @Prop({ required: true })
  title: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Post' }] })
  posts: Types.ObjectId[];
}

export const TopicSchema = SchemaFactory.createForClass(Topic);

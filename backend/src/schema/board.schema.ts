import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';

export type BoardDocument = HydratedDocument<Board>;

@Schema()
export class Board {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({ default: new Date(), required: true })
  date: Date;
}

export const BoardSchema = SchemaFactory.createForClass(Board);

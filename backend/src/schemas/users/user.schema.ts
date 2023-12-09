import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  oauthId: string;

  @Prop({ required: true })
  oauthProvider: string;

  @Prop({ required: true, unique: true })
  nickname: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

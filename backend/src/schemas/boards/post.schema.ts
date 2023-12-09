import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Post extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  @Prop({ required: true })
  authorNickname: string;

  @Prop({ required: true })
  text: string;

  @Prop({ type: [String] }) // 여러 개의 이미지 URL을 저장하는 배열
  imageUrls: string[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop({ default: 0 })
  likesCount: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Comment' }] })
  comments: Types.ObjectId[];
}

const PostSchema = SchemaFactory.createForClass(Post);

PostSchema.pre<Post>('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export { PostSchema };

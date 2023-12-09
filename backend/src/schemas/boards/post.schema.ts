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

// save하면 updatedAt이 자동으로 현재 시간으로 설정되도록 설정
// PostSchema.pre<Post>('save', function (next) {
//   this.updatedAt = new Date();
//   next();
// });

export { PostSchema };

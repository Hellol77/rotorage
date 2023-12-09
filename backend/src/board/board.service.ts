import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/schemas/boards/post.schema';
import { GetPostsByTopicDto } from './dto/getPosts.dto';

@Injectable()
export class BoardService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async getPostsByTopic(dto: GetPostsByTopicDto): Promise<Post[]> {
    try {
      const posts = await this.postModel.find({ topic: dto.topicId }).exec();
      if (!posts || posts.length === 0) {
        throw new NotFoundException('No posts found for the specified topic.');
      }
      return posts;
    } catch (error) {
      throw new NotFoundException('No posts found for the specified topic.');
    }
  }
}

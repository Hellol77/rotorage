import { IsNotEmpty, IsString } from 'class-validator';

export class GetPostsByTopicDto {
  @IsNotEmpty()
  @IsString()
  topicId: string;
}

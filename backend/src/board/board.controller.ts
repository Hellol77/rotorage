import { Controller, Get, Param } from '@nestjs/common';
import { BoardService } from './board.service';
import { GetPostsByTopicDto } from './dto/getPosts.dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get(':topicId/posts')
  async getPostsByTopic(@Param() params: GetPostsByTopicDto) {
    return this.boardService.getPostsByTopic(params);
  }
}

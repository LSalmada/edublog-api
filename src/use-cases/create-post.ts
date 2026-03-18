import { IPost } from '@/entities/models/post.interface'
import { IPostsRepository } from '@/repositories/posts.repository.interface'

export class CreatePostUseCase {
  constructor(private postsRepository: IPostsRepository) {}

  async handler(post: IPost): Promise<IPost> {
    return this.postsRepository.create(post)
  }
}

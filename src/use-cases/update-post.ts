import { IPost } from '@/entities/models/post.interface'
import { IPostsRepository } from '@/repositories/posts.repository.interface'

export class UpdatePostUseCase {
  constructor(private postsRepository: IPostsRepository) {}

  async handler(post: IPost): Promise<IPost> {
    return this.postsRepository.update(post)
  }
}

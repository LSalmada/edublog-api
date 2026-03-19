import { IPost } from '@/entities/models/post.interface'
import { IPostsRepository } from '@/repositories/posts.repository.interface'

export class ListPostByIdUseCase {
  constructor(private postsRepository: IPostsRepository) {}

  async handler(id: number): Promise<IPost | null> {
    return this.postsRepository.findById(id)
  }
}

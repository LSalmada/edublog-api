import { IPost } from '@/entities/models/post.interface'
import { IPostsRepository } from '@/repositories/posts.repository.interface'

export class SearchPostUseCase {
  constructor(private postsRepository: IPostsRepository) {}

  async handler(query: string, onlyPublished = false): Promise<IPost[]> {
    return this.postsRepository.search(query, onlyPublished)
  }
}

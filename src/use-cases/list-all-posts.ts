import { IPost } from '@/entities/models/post.interface'
import { IPostsRepository } from '@/repositories/posts.repository.interface'

export class ListAllPostsUseCase {
  constructor(private postsRepository: IPostsRepository) {}

  async handler(page: number, limit: number, onlyPublished = false): Promise<IPost[]> {
    return this.postsRepository.listAllPosts(page, limit, onlyPublished)
  }
}

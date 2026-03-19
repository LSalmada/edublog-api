import { IPostsRepository } from '@/repositories/posts.repository.interface'

export class DestroyPostUseCase {
  constructor(private postsRepository: IPostsRepository) {}

  async handler(id: number): Promise<void> {
    await this.postsRepository.delete(id)
  }
}

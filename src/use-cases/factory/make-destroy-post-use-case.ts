import { DestroyPostUseCase } from '../destroy-post'
import { PostsRepository } from '@/repositories/typeorm/posts.repository'

export function makeDestroyPostUseCase() {
  const postsRepository = new PostsRepository()
  const destroyPostUseCase = new DestroyPostUseCase(postsRepository)

  return destroyPostUseCase
}

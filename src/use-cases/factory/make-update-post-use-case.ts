import { PostsRepository } from '@/repositories/typeorm/posts.repository'
import { UpdatePostUseCase } from '../update-post'

export function makeUpdatePostUseCase() {
  const postsRepository = new PostsRepository()
  const updatePostUseCase = new UpdatePostUseCase(postsRepository)

  return updatePostUseCase
}

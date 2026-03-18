import { PostsRepository } from '@/repositories/typeorm/posts.repository'
import { CreatePostUseCase } from '../create-post'

export function makeCreatePostUseCase() {
  const postsRepository = new PostsRepository()
  const createPostUseCase = new CreatePostUseCase(postsRepository)

  return createPostUseCase
}

import { PostsRepository } from '@/repositories/typeorm/posts.repository'
import { SearchPostUseCase } from '../search-post'

export function makeSearchPostUseCase() {
  const postsRepository = new PostsRepository()
  const searchPostUseCase = new SearchPostUseCase(postsRepository)

  return searchPostUseCase
}

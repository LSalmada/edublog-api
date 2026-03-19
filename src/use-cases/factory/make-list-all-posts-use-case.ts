import { PostsRepository } from '@/repositories/typeorm/posts.repository'
import { ListAllPostsUseCase } from '../list-all-posts'

export function makeListAllPostsUseCase() {
  const postsRepository = new PostsRepository()
  const listAllPostsUseCase = new ListAllPostsUseCase(postsRepository)

  return listAllPostsUseCase
}

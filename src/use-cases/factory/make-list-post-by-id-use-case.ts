import { PostsRepository } from '@/repositories/typeorm/posts.repository'
import { ListPostByIdUseCase } from '../list-post-by-id'

export function makeListPostByIdUseCase() {
  const postsRepository = new PostsRepository()
  const listPostByIdUseCase = new ListPostByIdUseCase(postsRepository)

  return listPostByIdUseCase
}

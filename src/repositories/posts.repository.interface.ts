import { IPost } from '@/entities/models/post.interface'

export interface IPostsRepository {
  create(post: IPost): Promise<IPost>
  listAllPosts(page: number, limit: number, onlyPublished?: boolean): Promise<IPost[]>
  findById(id: number): Promise<IPost | null>
  update(post: IPost): Promise<IPost>
  delete(id: number): Promise<void>
  search(query: string, onlyPublished?: boolean): Promise<IPost[]>
}

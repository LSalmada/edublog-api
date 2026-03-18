import { IPost } from '@/entities/models/post.interface'

export interface IPostsRepository {
  create(post: IPost): Promise<IPost>
  findAll(page: number, limit: number): Promise<IPost[]>
  findById(id: number): Promise<IPost | null>
  update(post: IPost): Promise<IPost>
  delete(id: number): Promise<void>
}

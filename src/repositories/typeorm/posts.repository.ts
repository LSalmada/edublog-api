import { Post } from '@/entities/post.entity'
import { IPostsRepository } from '../posts.repository.interface'
import { appDataSource } from '@/lib/typeorm/typeorm'
import { IPost } from '@/entities/models/post.interface'
import { Repository } from 'typeorm'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export class PostsRepository implements IPostsRepository {
  private repository: Repository<Post>

  constructor() {
    this.repository = appDataSource.getRepository(Post)
  }

  async create(post: IPost): Promise<IPost> {
    return this.repository.save(post)
  }

  async listAllPosts(page: number, limit: number): Promise<IPost[]> {
    return this.repository.find({ skip: (page - 1) * limit, take: limit })
  }

  async findById(id: number): Promise<IPost | null> {
    return this.repository.findOne({ where: { id } })
  }

  async update(post: IPost): Promise<IPost> {
    return this.repository.save(post)
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id)
  }
}

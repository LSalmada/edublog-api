import { Post } from '@/entities/post.entity'
import { IPostsRepository } from '../posts.repository.interface'
import { appDataSource } from '@/lib/typeorm/typeorm'
import { IPost } from '@/entities/models/post.interface'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { ILike, Repository } from 'typeorm'

export class PostsRepository implements IPostsRepository {
  private repository: Repository<Post>

  constructor() {
    this.repository = appDataSource.getRepository(Post)
  }

  async create(post: IPost): Promise<IPost> {
    return this.repository.save(post)
  }

  async listAllPosts(page: number, limit: number, onlyPublished = false): Promise<IPost[]> {
    return this.repository.find({
      skip: (page - 1) * limit,
      take: limit,
      where: onlyPublished ? { isPublished: true } : undefined,
      order: { createdAt: 'DESC' },
    })
  }

  async findById(id: number): Promise<IPost | null> {
    return this.repository.findOne({ where: { id } })
  }

  async update(post: IPost): Promise<IPost> {
    if (!post.id) throw new ResourceNotFoundError()

    const updates: Partial<Post> = {
      title: post.title,
      content: post.content,
      author: post.author,
    }
    if (post.isPublished !== undefined) updates.isPublished = post.isPublished

    const result = await this.repository.update({ id: post.id }, updates)
    if (result.affected === 0) throw new ResourceNotFoundError()

    const updated = await this.repository.findOne({ where: { id: post.id } })
    if (!updated) throw new ResourceNotFoundError()
    return updated
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id)
  }

  async search(query: string, onlyPublished = false): Promise<IPost[]> {
    const baseConditions = [{ title: ILike(`%${query}%`) }, { content: ILike(`%${query}%`) }]
    return this.repository.find({
      where: onlyPublished ? baseConditions.map((cond) => ({ ...cond, isPublished: true })) : baseConditions,
      order: { createdAt: 'DESC' },
    })
  }
}

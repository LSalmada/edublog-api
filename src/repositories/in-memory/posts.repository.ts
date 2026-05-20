import { IPost } from '@/entities/models/post.interface'
import { IPostsRepository } from '@/repositories/posts.repository.interface'

export class InMemoryPostsRepository implements IPostsRepository {
  public posts: IPost[] = []
  private nextId = 1

  async create(post: IPost): Promise<IPost> {
    const newPost: IPost = {
      ...post,
      id: this.nextId++,
      createdAt: post.createdAt ?? new Date(),
      updatedAt: post.updatedAt ?? new Date(),
      isPublished: post.isPublished ?? false,
    }
    this.posts.push(newPost)
    return newPost
  }

  async listAllPosts(page: number, limit: number, onlyPublished = false): Promise<IPost[]> {
    const offset = (page - 1) * limit
    const source = onlyPublished ? this.posts.filter((p) => p.isPublished) : this.posts
    return source.slice(offset, offset + limit)
  }

  async findById(id: number): Promise<IPost | null> {
    return this.posts.find((p) => p.id === id) ?? null
  }

  async update(post: IPost): Promise<IPost> {
    const index = this.posts.findIndex((p) => p.id === post.id)
    if (index === -1) throw new Error(`Post with id ${post.id} not found`)
    const updated: IPost = { ...this.posts[index], ...post, updatedAt: new Date() }
    this.posts[index] = updated
    return updated
  }

  async delete(id: number): Promise<void> {
    this.posts = this.posts.filter((p) => p.id !== id)
  }

  async search(query: string, onlyPublished = false): Promise<IPost[]> {
    const lower = query.toLowerCase()
    const source = onlyPublished ? this.posts.filter((p) => p.isPublished) : this.posts
    return source.filter((p) => p.title.toLowerCase().includes(lower) || p.content.toLowerCase().includes(lower))
  }
}

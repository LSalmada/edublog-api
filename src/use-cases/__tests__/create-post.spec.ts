import { InMemoryPostsRepository } from '@/repositories/in-memory/posts.repository'
import { CreatePostUseCase } from '@/use-cases/create-post'

describe('CreatePostUseCase', () => {
  let repository: InMemoryPostsRepository
  let sut: CreatePostUseCase

  beforeEach(() => {
    repository = new InMemoryPostsRepository()
    sut = new CreatePostUseCase(repository)
  })

  it('should create a post and return it with an assigned id', async () => {
    const post = await sut.handler({
      title: 'Hello World',
      content: 'First post content',
      author: 'Alice',
    })

    expect(post.id).toBeDefined()
    expect(post.title).toBe('Hello World')
    expect(post.content).toBe('First post content')
    expect(post.author).toBe('Alice')
  })

  it('should persist the post in the repository', async () => {
    await sut.handler({ title: 'Persisted', content: 'Body', author: 'Bob' })

    expect(repository.posts).toHaveLength(1)
    expect(repository.posts[0].title).toBe('Persisted')
  })

  it('should default isPublished to false when not provided', async () => {
    const post = await sut.handler({ title: 'Draft', content: 'Body', author: 'Carol' })

    expect(post.isPublished).toBe(false)
  })

  it('should assign incrementing ids to multiple posts', async () => {
    const first = await sut.handler({ title: 'First', content: 'A', author: 'Dave' })
    const second = await sut.handler({ title: 'Second', content: 'B', author: 'Dave' })

    expect(first.id).toBe(1)
    expect(second.id).toBe(2)
  })
})

import { InMemoryPostsRepository } from '@/repositories/in-memory/posts.repository'
import { ListAllPostsUseCase } from '@/use-cases/list-all-posts'

describe('ListAllPostsUseCase', () => {
  let repository: InMemoryPostsRepository
  let sut: ListAllPostsUseCase

  beforeEach(() => {
    repository = new InMemoryPostsRepository()
    sut = new ListAllPostsUseCase(repository)
  })

  it('should return an empty array when there are no posts', async () => {
    const posts = await sut.handler(1, 10)

    expect(posts).toEqual([])
  })

  it('should return all posts on the first page when total is below the limit', async () => {
    await repository.create({ title: 'A', content: 'Content A', author: 'Alice' })
    await repository.create({ title: 'B', content: 'Content B', author: 'Bob' })

    const posts = await sut.handler(1, 10)

    expect(posts).toHaveLength(2)
  })

  it('should paginate correctly — first page', async () => {
    for (let i = 1; i <= 5; i++) {
      await repository.create({ title: `Post ${i}`, content: `Body ${i}`, author: 'Author' })
    }

    const posts = await sut.handler(1, 3)

    expect(posts).toHaveLength(3)
    expect(posts[0].title).toBe('Post 1')
    expect(posts[2].title).toBe('Post 3')
  })

  it('should paginate correctly — second page', async () => {
    for (let i = 1; i <= 5; i++) {
      await repository.create({ title: `Post ${i}`, content: `Body ${i}`, author: 'Author' })
    }

    const posts = await sut.handler(2, 3)

    expect(posts).toHaveLength(2)
    expect(posts[0].title).toBe('Post 4')
    expect(posts[1].title).toBe('Post 5')
  })

  it('should return an empty array for a page beyond available data', async () => {
    await repository.create({ title: 'Only Post', content: 'Body', author: 'Author' })

    const posts = await sut.handler(2, 10)

    expect(posts).toEqual([])
  })
})

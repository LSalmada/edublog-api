import { InMemoryPostsRepository } from '@/repositories/in-memory/posts.repository'
import { ListPostByIdUseCase } from '@/use-cases/list-post-by-id'

describe('ListPostByIdUseCase', () => {
  let repository: InMemoryPostsRepository
  let sut: ListPostByIdUseCase

  beforeEach(() => {
    repository = new InMemoryPostsRepository()
    sut = new ListPostByIdUseCase(repository)
  })

  it('should return the post when it exists', async () => {
    const created = await repository.create({
      title: 'Existing Post',
      content: 'Some content',
      author: 'Alice',
    })

    const post = await sut.handler(created.id!)

    expect(post).not.toBeNull()
    expect(post!.id).toBe(created.id)
    expect(post!.title).toBe('Existing Post')
  })

  it('should return null when the post does not exist', async () => {
    const post = await sut.handler(999)

    expect(post).toBeNull()
  })

  it('should return the correct post among multiple posts', async () => {
    await repository.create({ title: 'First', content: 'A', author: 'Bob' })
    const second = await repository.create({ title: 'Second', content: 'B', author: 'Carol' })
    await repository.create({ title: 'Third', content: 'C', author: 'Dave' })

    const post = await sut.handler(second.id!)

    expect(post!.title).toBe('Second')
  })
})

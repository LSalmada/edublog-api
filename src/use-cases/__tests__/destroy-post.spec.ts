import { InMemoryPostsRepository } from '@/repositories/in-memory/posts.repository'
import { DestroyPostUseCase } from '@/use-cases/destroy-post'

describe('DestroyPostUseCase', () => {
  let repository: InMemoryPostsRepository
  let sut: DestroyPostUseCase

  beforeEach(() => {
    repository = new InMemoryPostsRepository()
    sut = new DestroyPostUseCase(repository)
  })

  it('should remove the post from the repository', async () => {
    const created = await repository.create({
      title: 'To Be Deleted',
      content: 'Body',
      author: 'Alice',
    })

    await sut.handler(created.id!)

    expect(repository.posts).toHaveLength(0)
  })

  it('should only remove the targeted post', async () => {
    const first = await repository.create({ title: 'Keep', content: 'A', author: 'Bob' })
    const second = await repository.create({ title: 'Remove', content: 'B', author: 'Bob' })

    await sut.handler(second.id!)

    expect(repository.posts).toHaveLength(1)
    expect(repository.posts[0].id).toBe(first.id)
  })

  it('should resolve without error when deleting a non-existent id', async () => {
    await expect(sut.handler(999)).resolves.toBeUndefined()
  })
})

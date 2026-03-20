import { InMemoryPostsRepository } from '@/repositories/in-memory/posts.repository'
import { UpdatePostUseCase } from '@/use-cases/update-post'

describe('UpdatePostUseCase', () => {
  let repository: InMemoryPostsRepository
  let sut: UpdatePostUseCase

  beforeEach(() => {
    repository = new InMemoryPostsRepository()
    sut = new UpdatePostUseCase(repository)
  })

  it('should update the title of an existing post', async () => {
    const created = await repository.create({
      title: 'Original Title',
      content: 'Original Content',
      author: 'Alice',
    })

    const updated = await sut.handler({ ...created, title: 'Updated Title' })

    expect(updated.title).toBe('Updated Title')
    expect(updated.content).toBe('Original Content')
  })

  it('should update the content of an existing post', async () => {
    const created = await repository.create({
      title: 'Title',
      content: 'Old Content',
      author: 'Bob',
    })

    const updated = await sut.handler({ ...created, content: 'New Content' })

    expect(updated.content).toBe('New Content')
  })

  it('should update isPublished flag', async () => {
    const created = await repository.create({
      title: 'Draft',
      content: 'Body',
      author: 'Carol',
    })

    expect(created.isPublished).toBe(false)

    const updated = await sut.handler({ ...created, isPublished: true })

    expect(updated.isPublished).toBe(true)
  })

  it('should persist the updated post in the repository', async () => {
    const created = await repository.create({ title: 'Before', content: 'Body', author: 'Dave' })

    await sut.handler({ ...created, title: 'After' })

    expect(repository.posts[0].title).toBe('After')
  })

  it('should throw when updating a post that does not exist', async () => {
    await expect(
      sut.handler({ id: 999, title: 'Ghost', content: 'None', author: 'Eve' }),
    ).rejects.toThrow()
  })
})

import { InMemoryPostsRepository } from '@/repositories/in-memory/posts.repository'
import { SearchPostUseCase } from '@/use-cases/search-post'

describe('SearchPostUseCase', () => {
  let repository: InMemoryPostsRepository
  let sut: SearchPostUseCase

  beforeEach(async () => {
    repository = new InMemoryPostsRepository()
    sut = new SearchPostUseCase(repository)

    await repository.create({ title: 'TypeScript Tips', content: 'Use strict mode.', author: 'Alice' })
    await repository.create({ title: 'Node.js Guide', content: 'Async/await in TypeScript.', author: 'Bob' })
    await repository.create({ title: 'React Patterns', content: 'Component composition.', author: 'Carol' })
  })

  it('should return posts whose title matches the query', async () => {
    const results = await sut.handler('TypeScript')

    expect(results).toHaveLength(2)
    const titles = results.map((p) => p.title)
    expect(titles).toContain('TypeScript Tips')
    expect(titles).toContain('Node.js Guide')
  })

  it('should return posts whose content matches the query', async () => {
    const results = await sut.handler('composition')

    expect(results).toHaveLength(1)
    expect(results[0].title).toBe('React Patterns')
  })

  it('should be case-insensitive', async () => {
    const results = await sut.handler('typescript')

    expect(results).toHaveLength(2)
  })

  it('should return an empty array when there are no matches', async () => {
    const results = await sut.handler('Python')

    expect(results).toEqual([])
  })

  it('should return all posts when query matches every post', async () => {
    await repository.create({ title: 'Common', content: 'Has the keyword hello.', author: 'Dave' })
    await repository.create({ title: 'Also hello', content: 'Another one.', author: 'Eve' })

    const results = await sut.handler('hello')

    expect(results).toHaveLength(2)
  })
})

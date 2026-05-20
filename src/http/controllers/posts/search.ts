import { makeSearchPostUseCase } from '@/use-cases/factory/make-search-post-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

interface SearchOptions {
  onlyPublished?: boolean
}

export function makeSearchHandler({ onlyPublished = false }: SearchOptions = {}) {
  return async function search(request: FastifyRequest, reply: FastifyReply) {
    const searchQuerySchema = z.object({
      query: z.string(),
    })

    const { query } = searchQuerySchema.parse(request.query)

    const searchPostUseCase = makeSearchPostUseCase()
    const posts = await searchPostUseCase.handler(query, onlyPublished)

    return reply.status(200).send(posts)
  }
}

export const search = makeSearchHandler({ onlyPublished: true })
export const searchAdmin = makeSearchHandler({ onlyPublished: false })

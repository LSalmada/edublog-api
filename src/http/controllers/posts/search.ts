import { makeSearchPostUseCase } from '@/use-cases/factory/make-search-post-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchBodySchema = z.object({
    query: z.string(),
  })

  const { query } = searchBodySchema.parse(request.query)

  const searchPostUseCase = makeSearchPostUseCase()
  const posts = await searchPostUseCase.handler(query)

  return reply.status(200).send(posts)
}

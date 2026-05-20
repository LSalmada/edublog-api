import { makeListAllPostsUseCase } from '@/use-cases/factory/make-list-all-posts-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

interface ListAllPostsOptions {
  onlyPublished?: boolean
}

export function makeListAllPostsHandler({ onlyPublished = false }: ListAllPostsOptions = {}) {
  return async function listAllPosts(request: FastifyRequest, reply: FastifyReply) {
    const listAllPostsQuerySchema = z.object({
      page: z.coerce.number().default(1),
      limit: z.coerce.number().default(10),
    })

    const { page, limit } = listAllPostsQuerySchema.parse(request.query)

    const listAllPostsUseCase = makeListAllPostsUseCase()
    const posts = await listAllPostsUseCase.handler(page, limit, onlyPublished)

    return reply.status(200).send(posts)
  }
}

export const listAllPosts = makeListAllPostsHandler({ onlyPublished: true })
export const listAllPostsAdmin = makeListAllPostsHandler({ onlyPublished: false })

import { makeListPostByIdUseCase } from '@/use-cases/factory/make-list-post-by-id-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function findById(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.coerce.number(),
  })

  const { id } = paramsSchema.parse(request.params)

  const listPostByIdUseCase = makeListPostByIdUseCase()
  const post = await listPostByIdUseCase.handler(id)

  return reply.status(200).send(post)
}

import { makeDestroyPostUseCase } from '@/use-cases/factory/make-destroy-post-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function destroy(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.coerce.number(),
  })

  const { id } = paramsSchema.parse(request.params)

  const destroyPostUseCase = makeDestroyPostUseCase()
  await destroyPostUseCase.handler(id)

  return reply.status(204).send()
}

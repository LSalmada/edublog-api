import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeUpdatePostUseCase } from '@/use-cases/factory/make-update-post-use-case'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.coerce.number(),
  })

  const updateBodySchema = z.object({
    title: z.string(),
    content: z.string(),
    author: z.string(),
  })

  const { id } = paramsSchema.parse(request.params)
  const { title, content, author } = updateBodySchema.parse(request.body)

  const updatePostUseCase = makeUpdatePostUseCase()
  const post = await updatePostUseCase.handler({
    id,
    title,
    content,
    author,
    updatedAt: new Date(),
  })

  return reply.status(200).send(post)
}

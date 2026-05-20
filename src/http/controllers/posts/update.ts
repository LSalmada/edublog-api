import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeUpdatePostUseCase } from '@/use-cases/factory/make-update-post-use-case'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.coerce.number(),
  })

  const updateBodySchema = z.object({
    title: z.string().min(1),
    content: z.string().min(1),
    author: z.string().min(1),
    isPublished: z.boolean().optional(),
  })

  const { id } = paramsSchema.parse(request.params)
  const { title, content, author, isPublished } = updateBodySchema.parse(request.body)

  const updatePostUseCase = makeUpdatePostUseCase()
  const post = await updatePostUseCase.handler({
    id,
    title,
    content,
    author,
    isPublished,
    updatedAt: new Date(),
  })

  return reply.status(200).send(post)
}

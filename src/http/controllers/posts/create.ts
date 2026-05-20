import { makeCreatePostUseCase } from '@/use-cases/factory/make-create-post-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    title: z.string().min(1),
    content: z.string().min(1),
    author: z.string().min(1),
    isPublished: z.boolean().optional(),
  })

  const { title, content, author, isPublished } = registerBodySchema.parse(request.body)

  const createPostUseCase = makeCreatePostUseCase()
  const post = await createPostUseCase.handler({ title, content, author, isPublished })

  return reply.status(201).send(post)
}

import { makeAuthenticateUseCase } from '@/use-cases/factory/make-authenticate-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function login(request: FastifyRequest, reply: FastifyReply) {
  const loginBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
  })

  const { email, password } = loginBodySchema.parse(request.body)

  const authenticateUseCase = makeAuthenticateUseCase()
  const { user } = await authenticateUseCase.handler({ email, password })

  const token = await reply.jwtSign(
    {
      sub: Number(user.id),
      email: user.email,
      role: user.role ?? 'teacher',
      name: user.name,
    },
    { sign: { expiresIn: '7d' } },
  )

  return reply.status(200).send({
    token,
    user: {
      id: Number(user.id),
      name: user.name,
      email: user.email,
      role: user.role ?? 'teacher',
    },
  })
}

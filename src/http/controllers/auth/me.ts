import { FastifyReply, FastifyRequest } from 'fastify'

export async function me(request: FastifyRequest, reply: FastifyReply) {
  const { sub, email, role, name } = request.user

  return reply.status(200).send({
    id: sub,
    name,
    email,
    role,
  })
}

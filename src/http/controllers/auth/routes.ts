import { FastifyInstance } from 'fastify'
import { login } from './login'
import { me } from './me'
import { verifyJwt } from '@/http/plugins/jwt'

const userSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    email: { type: 'string' },
    role: { type: 'string' },
  },
} as const

export async function authRoutes(app: FastifyInstance) {
  app.post(
    '/auth/login',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Authenticate a teacher and return a JWT',
        body: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string' },
          },
        },
        response: {
          200: {
            type: 'object',
            properties: {
              token: { type: 'string' },
              user: userSchema,
            },
          },
        },
      },
    },
    login,
  )

  app.get(
    '/auth/me',
    {
      onRequest: [verifyJwt],
      schema: {
        tags: ['Auth'],
        summary: 'Return the current authenticated user',
        security: [{ bearerAuth: [] }],
        response: { 200: userSchema },
      },
    },
    me,
  )
}

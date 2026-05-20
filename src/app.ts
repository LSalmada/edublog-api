import 'reflect-metadata'
import fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import '@/lib/typeorm/typeorm'
import { env } from '@/env'
import { globalErrorHandler } from './utils/global-error-handler'
import { postRoutes } from './http/controllers/posts/routes'
import { authRoutes } from './http/controllers/auth/routes'

export const app = fastify()

app.register(fastifyCors, {
  origin: env.CORS_ORIGIN === '*' ? true : env.CORS_ORIGIN.split(',').map((o) => o.trim()),
  credentials: true,
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(fastifySwagger, {
  openapi: {
    info: { title: 'EduBlog API', version: '1.0.0' },
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      },
    },
  },
})
app.register(fastifySwaggerUi, { routePrefix: '/docs' })

app.register(authRoutes)
app.register(postRoutes)

app.setErrorHandler(globalErrorHandler)

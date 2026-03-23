import 'reflect-metadata'
import fastify from 'fastify'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import '@/lib/typeorm/typeorm'
import { globalErrorHandler } from './utils/global-error-handler'
import { postRoutes } from './http/controllers/posts/routes'

export const app = fastify()

app.register(fastifySwagger, {
  openapi: {
    info: { title: 'EduBlog API', version: '1.0.0' },
  },
})
app.register(fastifySwaggerUi, { routePrefix: '/docs' })
app.register(postRoutes)
app.setErrorHandler(globalErrorHandler)

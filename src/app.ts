import 'reflect-metadata'
import fastify from 'fastify'
import '@/lib/typeorm/typeorm'
import { globalErrorHandler } from './utils/global-error-handler'
import { postRoutes } from './http/controllers/posts/routes'

export const app = fastify()

app.register(postRoutes)
app.setErrorHandler(globalErrorHandler)

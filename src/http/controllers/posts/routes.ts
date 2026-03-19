import { FastifyInstance } from 'fastify'
import { create } from './create'
import { update } from './update'
import { listAllPosts } from './list-all-posts'

export async function postRoutes(app: FastifyInstance) {
  app.post('/posts', create)
  app.put('/posts/:id', update)
  app.get('/posts', listAllPosts)
}

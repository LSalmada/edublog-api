import { FastifyInstance } from 'fastify'
import { create } from './create'
import { update } from './update'
import { listAllPosts } from './list-all-posts'
import { findById } from './find-by-id'
import { destroy } from './destroy'
import { search } from './search'

const postSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    title: { type: 'string' },
    content: { type: 'string' },
    author: { type: 'string' },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' },
    isPublished: { type: 'boolean' },
  },
} as const

const idParamSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: { type: 'integer' },
  },
} as const

const postBodySchema = {
  type: 'object',
  required: ['title', 'content', 'author'],
  properties: {
    title: { type: 'string' },
    content: { type: 'string' },
    author: { type: 'string' },
  },
} as const

export async function postRoutes(app: FastifyInstance) {
  app.post(
    '/posts',
    {
      schema: {
        tags: ['Posts'],
        summary: 'Create a new post',
        body: postBodySchema,
        response: {
          201: postSchema,
        },
      },
    },
    create,
  )

  app.put(
    '/posts/:id',
    {
      schema: {
        tags: ['Posts'],
        summary: 'Update a post by ID',
        params: idParamSchema,
        body: postBodySchema,
        response: {
          200: postSchema,
        },
      },
    },
    update,
  )

  app.get(
    '/posts',
    {
      schema: {
        tags: ['Posts'],
        summary: 'List all posts',
        response: {
          200: {
            type: 'array',
            items: postSchema,
          },
        },
      },
    },
    listAllPosts,
  )

  app.get(
    '/posts/:id',
    {
      schema: {
        tags: ['Posts'],
        summary: 'Get a post by ID',
        params: idParamSchema,
        response: {
          200: postSchema,
        },
      },
    },
    findById,
  )

  app.delete(
    '/posts/:id',
    {
      schema: {
        tags: ['Posts'],
        summary: 'Delete a post by ID',
        params: idParamSchema,
        response: {
          204: { type: 'null', description: 'Post deleted successfully' },
        },
      },
    },
    destroy,
  )

  app.get(
    '/posts/search',
    {
      schema: {
        tags: ['Posts'],
        summary: 'Search posts by query',
        querystring: {
          type: 'object',
          required: ['query'],
          properties: {
            query: { type: 'string' },
          },
        },
        response: {
          200: {
            type: 'array',
            items: postSchema,
          },
        },
      },
    },
    search,
  )
}

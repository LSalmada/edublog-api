import { FastifyInstance } from 'fastify'
import { create } from './create'
import { update } from './update'
import { listAllPosts, listAllPostsAdmin } from './list-all-posts'
import { findById } from './find-by-id'
import { destroy } from './destroy'
import { search, searchAdmin } from './search'
import { verifyJwt } from '@/http/plugins/jwt'

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
    isPublished: { type: 'boolean' },
  },
} as const

const postsListSchema = {
  type: 'array',
  items: postSchema,
} as const

const searchQuerystring = {
  type: 'object',
  required: ['query'],
  properties: { query: { type: 'string' } },
} as const

export async function postRoutes(app: FastifyInstance) {
  app.get(
    '/posts',
    {
      schema: {
        tags: ['Posts'],
        summary: 'List published posts (public)',
        response: { 200: postsListSchema },
      },
    },
    listAllPosts,
  )

  app.get(
    '/posts/search',
    {
      schema: {
        tags: ['Posts'],
        summary: 'Search published posts (public)',
        querystring: searchQuerystring,
        response: { 200: postsListSchema },
      },
    },
    search,
  )

  app.get(
    '/posts/:id',
    {
      schema: {
        tags: ['Posts'],
        summary: 'Get a post by ID',
        params: idParamSchema,
        response: { 200: postSchema },
      },
    },
    findById,
  )

  app.get(
    '/admin/posts',
    {
      onRequest: [verifyJwt],
      schema: {
        tags: ['Admin'],
        summary: 'List all posts including drafts (protected)',
        security: [{ bearerAuth: [] }],
        response: { 200: postsListSchema },
      },
    },
    listAllPostsAdmin,
  )

  app.get(
    '/admin/posts/search',
    {
      onRequest: [verifyJwt],
      schema: {
        tags: ['Admin'],
        summary: 'Search all posts including drafts (protected)',
        security: [{ bearerAuth: [] }],
        querystring: searchQuerystring,
        response: { 200: postsListSchema },
      },
    },
    searchAdmin,
  )

  app.post(
    '/posts',
    {
      onRequest: [verifyJwt],
      schema: {
        tags: ['Posts'],
        summary: 'Create a new post (protected)',
        security: [{ bearerAuth: [] }],
        body: postBodySchema,
        response: { 201: postSchema },
      },
    },
    create,
  )

  app.put(
    '/posts/:id',
    {
      onRequest: [verifyJwt],
      schema: {
        tags: ['Posts'],
        summary: 'Update a post by ID (protected)',
        security: [{ bearerAuth: [] }],
        params: idParamSchema,
        body: postBodySchema,
        response: { 200: postSchema },
      },
    },
    update,
  )

  app.delete(
    '/posts/:id',
    {
      onRequest: [verifyJwt],
      schema: {
        tags: ['Posts'],
        summary: 'Delete a post by ID (protected)',
        security: [{ bearerAuth: [] }],
        params: idParamSchema,
        response: {
          204: { type: 'null', description: 'Post deleted successfully' },
        },
      },
    },
    destroy,
  )
}

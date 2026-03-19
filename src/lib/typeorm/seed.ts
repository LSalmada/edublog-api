import 'reflect-metadata'
import { appDataSource } from './typeorm'
import { Post } from '@/entities/post.entity'

const posts: Partial<Post>[] = [
  {
    title: 'Fastify vs Express: qual escolher?',
    content:
      'Comparamos as duas principais frameworks HTTP do ecossistema Node.js, analisando performance, ecossistema e facilidade de uso.',
    author: 'Rafael Santos',
    isPublished: true,
  },
  {
    title: 'Entendendo o padrão Repository',
    content:
      'O padrão Repository abstrai o acesso ao banco de dados e facilita testes unitários ao desacoplar a lógica de negócio da persistência.',
    author: 'Lucas Oliveira',
    isPublished: false,
  },
  {
    title: 'Docker para desenvolvedores Node.js',
    content:
      'Aprenda a containerizar sua aplicação Node.js com Docker, criando ambientes consistentes de desenvolvimento e produção.',
    author: 'Ana Costa',
    isPublished: true,
  },
]

async function seed() {
  await appDataSource.initialize()

  const repository = appDataSource.getRepository(Post)

  await repository.save(posts)

  console.log(`✅ Seed concluído: ${posts.length} posts inseridos.`)

  await appDataSource.destroy()
}

seed().catch((err) => {
  console.error('Erro ao executar seed:', err)
  process.exit(1)
})

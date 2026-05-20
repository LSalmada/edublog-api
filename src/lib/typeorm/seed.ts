import 'reflect-metadata'
import { hash } from 'bcryptjs'
import { appDataSource } from './typeorm'
import { Post } from '@/entities/post.entity'
import { User } from '@/entities/user.entity'

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

const DEFAULT_TEACHER_EMAIL = 'teacher@edublog.dev'
const DEFAULT_TEACHER_PASSWORD = 'teacher123'

async function seed() {
  await appDataSource.initialize()

  const postRepository = appDataSource.getRepository(Post)
  const userRepository = appDataSource.getRepository(User)

  await postRepository.save(posts)
  console.log(`✅ Seed concluído: ${posts.length} posts inseridos.`)

  const existingTeacher = await userRepository.findOne({ where: { email: DEFAULT_TEACHER_EMAIL } })
  if (!existingTeacher) {
    const passwordHash = await hash(DEFAULT_TEACHER_PASSWORD, 10)
    await userRepository.save({
      name: 'Default Teacher',
      email: DEFAULT_TEACHER_EMAIL,
      passwordHash,
      role: 'teacher',
    })
    console.log(`✅ Seed concluído: docente padrão criado (${DEFAULT_TEACHER_EMAIL} / ${DEFAULT_TEACHER_PASSWORD}).`)
  } else {
    console.log(`ℹ️  Docente padrão já existe (${DEFAULT_TEACHER_EMAIL}).`)
  }

  await appDataSource.destroy()
}

seed().catch((err) => {
  console.error('Erro ao executar seed:', err)
  process.exit(1)
})

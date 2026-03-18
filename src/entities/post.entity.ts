import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { IPost } from './models/post.interface'

@Entity({ name: 'posts' })
export class Post implements IPost {
  @PrimaryGeneratedColumn('increment', { name: 'id', type: 'bigint' })
  id: number

  @Column({ name: 'title', type: 'text' })
  title: string

  @Column({ name: 'content', type: 'text' })
  content: string

  @Column({ name: 'author', type: 'text' })
  author: string

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date

  @Column({ name: 'is_published', type: 'boolean', default: false })
  isPublished: boolean
}

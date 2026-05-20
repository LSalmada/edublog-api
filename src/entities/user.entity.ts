import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, Unique } from 'typeorm'
import { IUser, UserRole } from './models/user.interface'

@Entity({ name: 'users' })
@Unique(['email'])
export class User implements IUser {
  @PrimaryGeneratedColumn('increment', { name: 'id', type: 'bigint' })
  id: number

  @Column({ name: 'name', type: 'text' })
  name: string

  @Column({ name: 'email', type: 'text' })
  email: string

  @Column({ name: 'password_hash', type: 'text' })
  passwordHash: string

  @Column({ name: 'role', type: 'text', default: 'teacher' })
  role: UserRole

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date
}

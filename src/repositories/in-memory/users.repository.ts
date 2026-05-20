import { IUser } from '@/entities/models/user.interface'
import { IUsersRepository } from '@/repositories/users.repository.interface'

export class InMemoryUsersRepository implements IUsersRepository {
  public users: IUser[] = []
  private nextId = 1

  async create(user: IUser): Promise<IUser> {
    const newUser: IUser = {
      ...user,
      id: this.nextId++,
      role: user.role ?? 'teacher',
      createdAt: user.createdAt ?? new Date(),
      updatedAt: user.updatedAt ?? new Date(),
    }
    this.users.push(newUser)
    return newUser
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return this.users.find((u) => u.email === email) ?? null
  }

  async findById(id: number): Promise<IUser | null> {
    return this.users.find((u) => u.id === id) ?? null
  }
}

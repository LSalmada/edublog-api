import { User } from '@/entities/user.entity'
import { IUsersRepository } from '../users.repository.interface'
import { appDataSource } from '@/lib/typeorm/typeorm'
import { IUser } from '@/entities/models/user.interface'
import { Repository } from 'typeorm'

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = appDataSource.getRepository(User)
  }

  async create(user: IUser): Promise<IUser> {
    return this.repository.save(user)
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return this.repository.findOne({ where: { email } })
  }

  async findById(id: number): Promise<IUser | null> {
    return this.repository.findOne({ where: { id } })
  }
}

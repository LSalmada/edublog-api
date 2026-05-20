import { IUser } from '@/entities/models/user.interface'

export interface IUsersRepository {
  create(user: IUser): Promise<IUser>
  findByEmail(email: string): Promise<IUser | null>
  findById(id: number): Promise<IUser | null>
}

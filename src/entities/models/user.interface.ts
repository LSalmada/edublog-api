export type UserRole = 'teacher'

export interface IUser {
  id?: number
  name: string
  email: string
  passwordHash: string
  role?: UserRole
  createdAt?: Date
  updatedAt?: Date
}

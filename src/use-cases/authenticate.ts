import { compare } from 'bcryptjs'
import { IUser } from '@/entities/models/user.interface'
import { IUsersRepository } from '@/repositories/users.repository.interface'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface AuthenticateInput {
  email: string
  password: string
}

interface AuthenticateOutput {
  user: IUser
}

export class AuthenticateUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async handler({ email, password }: AuthenticateInput): Promise<AuthenticateOutput> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const passwordMatches = await compare(password, user.passwordHash)

    if (!passwordMatches) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}

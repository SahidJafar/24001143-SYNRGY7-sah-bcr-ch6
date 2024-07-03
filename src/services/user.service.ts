import { UserRepository } from "../repositories/user.repository"
import { hashPassword, comparePassword } from "../utils/bcrypt.password"
import { createRefreshToken, createToken } from "../utils/token"
import { v4 as uuidv4 } from "uuid"

export class UserService {
  public userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  async create(user: any): Promise<any> {
    const isEmailExist = await this.userRepository.show({ email: user.email })

    if (isEmailExist !== undefined) {
      throw new Error("Email already exist")
    }

    user.id = uuidv4()
    user.password = await hashPassword(user.password as string)

    return await this.userRepository.create({
      ...user,
      role: "admin",
    })
  }

  async register(user: any): Promise<any> {
    const isEmailExist = await this.userRepository.show({ email: user.email })

    if (isEmailExist !== undefined) {
      throw new Error("Email already exist")
    }
    user.id = uuidv4()
    user.password = await hashPassword(user.password as string)

    return await this.userRepository.create({
      ...user,
      role: "member",
    })
  }

  async login(email: string, password: string): Promise<any> {
    const user = await this.userRepository.show({ email })

    if (user === undefined) {
      throw new Error("Email or password invalid")
    }

    const isPasswordValid = await comparePassword(password, user.password)

    if (!isPasswordValid) {
      throw new Error("Email or password invalid")
    }

    const token = createToken({
      id: user.id,
      name: user.name,
      email: user.email,
    })

    const refreshToken = createRefreshToken({
      id: user.id,
      name: user.name,
      email: user.email,
    })

    await this.userRepository.update(user.id, {
      token,
      refresh_token: refreshToken,
    })

    const { password: userPassword, ...userWithoutPassword } = user

    // Menyaring properti yang diinginkan dari objek pengguna
    const filteredUser = {
      id: userWithoutPassword.id,
      name: userWithoutPassword.name,
      email: userWithoutPassword.email,
      role: userWithoutPassword.role,
    }

    return {
      user: filteredUser,
      token,
      refresh_token: refreshToken,
    }
  }

  async loginWithGoogle(payload: any): Promise<any> {
    // let user = await this.userRepository.show({ email })

    // if (!user) {
    //   user = await this.userRepository.create({
    //     id: uuidv4(),
    //     name,
    //     email,
    //     password: "",
    //   })
    // }

    const token = createToken({
      id: payload.sub,
      name: payload.name,
      email: payload.email,
    })

    return {
      user: payload,
      token,
    }
  }

  async logout(user: any): Promise<any> {
    return await this.userRepository.update(user.id, {
      token: "",
      refresh_token: "",
    })
  }

  async list(query: any): Promise<any> {
    const users = await this.userRepository.list(query)
    return users
  }

  async refreshToken(refreshToken: string): Promise<any> {
    const user = await this.userRepository.show({ refresh_token: refreshToken })

    if (user === undefined) {
      throw new Error("Refresh token invalid")
    }

    const token = createToken({
      id: user.id,
      name: user.name,
      email: user.email,
    })

    await this.userRepository.update(user.id, {
      token,
    })

    return {
      token,
    }
  }
}

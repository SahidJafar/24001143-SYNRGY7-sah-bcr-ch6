import { type Response, type Request, type Express } from "express"
import { ResponseHelper } from "../helpers/response.helper"
import { type Users } from "../databases/models/users"
import { UserService } from "../services/user.service"
import { config } from "dotenv"
import { ErrorHelper } from "../helpers/error.helper"
import { OAuth2Client } from "google-auth-library"

config()

// Oauth Google
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

export class UserController {
  public userService: UserService

  constructor() {
    this.userService = new UserService()
  }

  async store(req: Request<Record<string, unknown>, Record<string, unknown>, Users>, res: Response): Promise<void> {
    try {
      const user = await this.userService.create(req.body)

      ResponseHelper.success("Data created successfully", user, 201)(res)
    } catch (error) {
      ErrorHelper.handler(error, res)
    }
  }

  async register(req: Request<Record<string, unknown>, Record<string, unknown>, Users>, res: Response): Promise<void> {
    try {
      const user = await this.userService.register(req.body)

      ResponseHelper.success("Register successfully", user, 201)(res)
    } catch (error) {
      ErrorHelper.handler(error, res)
    }
  }

  async login(req: Request<Record<string, unknown>, Record<string, unknown>, Users>, res: Response): Promise<void> {
    try {
      const user = await this.userService.login(req.body.email, req.body.password)

      ResponseHelper.success("Login successfully", user, 200)(res)
    } catch (error) {
      ErrorHelper.handler(error, res)
    }
  }

  async loginWithGoogle(req: Request<Record<string, unknown>, Record<string, unknown>, Users>, res: Response): Promise<void> {
    try {
      const { token } = req.body

      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      })

      const payload = ticket.getPayload()
      if (!payload) {
        throw new Error("Invalid Google token")
      }

      const user = await this.userService.loginWithGoogle(payload)

      ResponseHelper.success("Login with Google successfully", user, 200)(res)
    } catch (error) {
      ErrorHelper.handler(error, res)
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user
      await this.userService.logout(user)

      ResponseHelper.success("Logout successfully", null, 200)(res)
    } catch (error) {
      ErrorHelper.handler(error, res)
    }
  }

  async whoami(req: Request, res: Response): Promise<void> {
    try {
      ResponseHelper.success("User data found", req.user, 200)(res)
    } catch (error) {
      ErrorHelper.handler(error, res)
    }
  }

  async list(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.list(req.query)

      ResponseHelper.success("User data found", users)(res)
    } catch (error) {
      ErrorHelper.handler(error, res)
    }
  }

  async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const refreshToken = req.body.refreshToken

      const token = await this.userService.refreshToken(refreshToken as string)

      ResponseHelper.success(
        "Token updated successfully",
        {
          token,
        },
        200
      )(res)
    } catch (error) {
      ErrorHelper.handler(error, res)
    }
  }
}

import { type Response, type Request, type Express } from "express"

import { type Cars } from "../databases/models/cars"
import { type IParams } from "../interfaces/id.interface"
import { ResponseHelper } from "../helpers/response.helper"
import { ErrorHelper } from "../helpers/error.helper"
import { CarService } from "../services/car.service"

export class CarsController {
  carService: CarService

  constructor() {
    this.carService = new CarService()
  }

  async list(req: Request, res: Response): Promise<void> {
    try {
      const cars = await this.carService.list(req.query)

      ResponseHelper.success("Data found", cars)(res)
    } catch (error) {
      ErrorHelper.handler(error, res)
    }
  }

  async listPublic(req: Request, res: Response): Promise<any> {
    try {
      const cars = await this.carService.listPublic(req.query)
      ResponseHelper.success("Data found", cars)(res)
    } catch (error) {
      ErrorHelper.handler(error, res)
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const body = req.body
      const image = req.file
      const car = await this.carService.create(body, image, req.user?.id)
      ResponseHelper.success("Data created successfully", car, 201)(res)
    } catch (error) {
      ErrorHelper.handler(error, res)
    }
  }

  async show(req: Request<IParams>, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const car = await this.carService.show(id)
      ResponseHelper.success("Data found", car)(res)
    } catch (error) {
      ErrorHelper.handler(error, res)
    }
  }

  async update(req: Request<IParams, Record<string, unknown>, Partial<Cars>>, res: Response): Promise<void> {
    try {
      const body = req.body
      const image = req.file
      const { id } = req.params
      const cars = await this.carService.update(id, body, image, req.user?.id)
      ResponseHelper.success("Data updated successfully", cars, 200)(res)
    } catch (error) {
      ErrorHelper.handler(error, res)
    }
  }

  async delete(req: Request<IParams>, res: Response): Promise<void> {
    try {
      const { id } = req.params
      await this.carService.delete(id, req.user?.id)
      ResponseHelper.success("Data deleted successfully")(res)
    } catch (error) {
      ErrorHelper.handler(error, res)
    }
  }
}

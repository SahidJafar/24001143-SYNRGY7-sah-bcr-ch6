import { type Cars, CarsModel } from '../databases/models/cars'

export class CarRepository {
  async list(query: any): Promise<any> {
    const { page, limit, search, sort, order, dateFilter, capacityFilter } = query
    const queryBuilder = CarsModel.query()
      .withGraphFetched('[userCreated(selectName), userUpdated(selectName), userDeleted(selectName)]')
      .modifiers({
        selectName: (builder) => {
          return builder.select('name', 'email')
        }
      })

    if ((await queryBuilder).length <= 0) {
      return []
    }
    if (search !== undefined) {
      await queryBuilder.whereILike('plate', `%${search}%`)
    }

    if (dateFilter !== undefined) {
      await queryBuilder.where('available_at', '>=', dateFilter as string)
    }

    if (capacityFilter !== undefined) {
      await queryBuilder.where('capacity', '>=', capacityFilter as string)
    }

    if (sort !== undefined) {
      if (order === 'asc' || order === 'desc') {
        await queryBuilder.orderBy(sort as string, order as 'asc' | 'desc')
      }
    }

    if (page !== undefined && limit !== undefined) {
      await queryBuilder.page((+page - 1) * +limit, +limit)
    }

    return await queryBuilder
  }

  async listPublic(query: any): Promise<any> {
    const { page, limit, search, sort, order, dateFilter, capacityFilter } = query
    const queryBuilder = CarsModel.query()
      .whereNotDeleted()
      .withGraphFetched('[userCreated(selectName), userUpdated(selectName), userDeleted(selectName)]')
      .modifiers({
        selectName: (builder) => {
          return builder.select('name', 'email')
        }
      })
      .throwIfNotFound()

    if (search !== undefined) {
      await queryBuilder.whereILike('plate', `%${search}%`)
    }

    if (dateFilter !== undefined) {
      await queryBuilder.where('available_at', '>=', dateFilter as string)
    }

    if (capacityFilter !== undefined) {
      await queryBuilder.where('capacity', '>=', capacityFilter as string)
    }

    if (sort !== undefined) {
      if (order === 'asc' || order === 'desc') {
        await queryBuilder.orderBy(sort as string, order as 'asc' | 'desc')
      }
    }

    if (page !== undefined && limit !== undefined) {
      await queryBuilder.page((+page - 1) * +limit, +limit)
    }

    return await queryBuilder
  }

  async show(id: number): Promise<any> {
    const car = await CarsModel.query()
      .findById(id)
      .withGraphFetched('[userCreated(selectName), userUpdated(selectName), userDeleted(selectName)]')
      .modifiers({
        selectName: (builder) => {
          return builder.select('name', 'email')
        }
      })
      .throwIfNotFound()
    return car
  }

  async create(car: Cars, userId: string): Promise<any> {
    const cars = await CarsModel.query()
      .insert({ ...car, created_by: userId })
      .returning('*')
    return cars
  }

  async update(id: number, car: Cars, userId: string): Promise<any> {
    const updatedCars = await CarsModel.query()
    .where({ id })
    .patch({ ...car, updated_by: userId })
    .returning('*')
    .throwIfNotFound();

     return updatedCars[0]; // Mengembalikan data pertama (dan satu-satunya) yang diperbarui
  }

  async delete(id: number, userId: string): Promise<any> {
    return await CarsModel.transaction(async (trx) => {
      await CarsModel.query(trx).where({ id }).patch({ deleted_by: userId }).throwIfNotFound()

      const deletedCars = await CarsModel.query(trx).delete().where({ id }).returning('*')

      return deletedCars
    })
  }
}

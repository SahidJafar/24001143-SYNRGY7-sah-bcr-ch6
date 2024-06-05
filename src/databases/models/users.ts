import { Model, ModelObject } from "objection";
import { CarsModel } from "./cars";

export class UsersModel extends Model{
    id!: string
    role!:string
    name!: string
    email!: string
    password!: string
    token!: string
    refresh_token!: string

    protected static nameOfTable = 'users'
    static get tableName(): string {
      return this.nameOfTable
    }
    static get relationMappings() {
        return {
          carsCreated: {
            relation: Model.HasManyRelation,
            modelClass: CarsModel,
            join: {
              from: "users.id",
              to: "cars.created_by",
            }
          },
          carsUpdated: {
            relation: Model.HasManyRelation,
            modelClass: CarsModel,
            join: {
              from: "users.id",
              to: "cars.updated_by",
            }
          },
          carsDeleted: {
            relation: Model.HasManyRelation,
            modelClass: CarsModel,
            join: {
              from: "users.id",
              to: "cars.deleted_by",
            }
          },
        }
    }
}

export type Users = ModelObject<UsersModel>

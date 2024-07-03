import type { Knex } from "knex"
import dotenv from "dotenv"
import path from "path"
dotenv.config()

dotenv.config({ path: path.join(__dirname, "../.env") })

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || "5432"),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,

      // Supabase Deploy
      // host: process.env.DB_HOST_BASE,
      // port: parseInt(process.env.DB_PORT_BASE || '5432'),
      // user: process.env.DB_USER_BASE,
      // password: process.env.DB_PASSWORD_BASE,
      // database: process.env.DB_NAME_BASE,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/databases/migrations",
    },
    seeds: {
      directory: "./src/databases/seeds",
    },
  },

  production: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      port: parseInt(process.env.DB_PORT || "5432"),
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/databases/migrations",
    },
    seeds: {
      directory: "./src/databases/seeds",
    },
  },
}

module.exports = config

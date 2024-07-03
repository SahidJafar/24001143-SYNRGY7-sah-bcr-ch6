import knex from "knex"

const knexInstance = knex({
  client: process.env.DB_CLIENT || "postgresql",
  connection: {
    host: process.env.DB_HOST || "127.0.0.1",
    port: parseInt(process.env.DB_PORT || "5432"),
    database: process.env.DB_NAME || "knex_starter",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "root",
  },
})

// Superbase Deploy
// const knexInstance = knex({
//   client: process.env.DB_CLIENT || "postgresql",
//   connection: {
//     host: process.env.DB_HOST_BASE || "127.0.0.1",
//     port: parseInt(process.env.DB_PORT_BASE || "5432"),
//     database: process.env.DB_NAME_BASE || "knex_starter",
//     user: process.env.DB_USER_BASE || "postgres",
//     password: process.env.DB_PASSWORD_BASE || "root",
//   },
// })

export default knexInstance

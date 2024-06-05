import express, { Express } from "express";
import { config } from "dotenv";
import router from "./routes";
import { Model } from "objection";
import knexInstance from "./config/db";

config()

const app: Express = express();
const PORT = process.env.PORT || 3000;

Model.knex(knexInstance);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use(router);

app.listen(PORT, () => {
    console.log(`Express is listening at http://localhost:${PORT}`);
});

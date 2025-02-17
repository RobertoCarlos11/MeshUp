import { modalClasses } from "@mui/material";
import sequelize from "../config/db";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const models = {};

fs.readdirSync(__dirname)
.filter((file) => file !== "index.js")
.forEach((file) => {
    const model = require(path.join(__dirname, file)).default;
    models[models.name] = model;
});

Object.keys(models).forEach((modelName) => {
    if(models[modelName].associate)
        models[modelName].associate(models);
});

models.sequelize = sequelize;
models.Sequelize = sequelize.Sequelize;

export default models;
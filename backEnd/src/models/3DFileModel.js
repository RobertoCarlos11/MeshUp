import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const Model = sequelize.define(
    "Model",{
        ModelId:{
            type: DataTypes.SMALLINT(),
            primaryKey: true,
            autoIncrement: true,
        },
        Model:{
            type: DataTypes.BLOB("LONG"),
            allowNull:false,
        },
        Texture:{
            type: DataTypes.BLOB("MEDIUM"),
            allowNull:false,
        }
    },
    {
        tableName:"Model",
        timestamps: false
    }
);

export default Model;
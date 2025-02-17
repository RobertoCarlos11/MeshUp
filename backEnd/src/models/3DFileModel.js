import sequelize from "../config/db";
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

Model.associate = (models) => {
    Model.hasMany(models.Post,{foreignKey:"ModelId", as: "posts"});
}

export default Model;
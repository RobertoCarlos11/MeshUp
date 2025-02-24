import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const Collection = sequelize.define(
    "Collection",{
        CollectionId:{
            type: DataTypes.SMALLINT(),
            primaryKey: true,
            autoIncrement: true,
        },
        Collection_Name:{
            type: DataTypes.STRING(50),
            allowNull:false,
        },
        Collection_Status:{
            type: DataTypes.BOOLEAN(),
            defaultValue: true,
        },
        Email:{
            type: DataTypes.STRING(50),
            allowNull:false,
            references:{
                model:"User",
                key:"Email",
            }
        },
    },
    {
        tableName:"Collection",
        timestamps: false
    }
);


export default Collection;
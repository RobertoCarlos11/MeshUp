import sequelize from "../config/db.js";
import { DataTypes, SMALLINT } from "sequelize";

const Collection_Element = sequelize.define(
    "Collection_Element",{
        ElementId:
        {
            type: DataTypes.SMALLINT(),
            autoIncrement:true,
            primaryKey:true,
        },
        CollectionId:
        {
            type: DataTypes.SMALLINT(),
            references:{
                model:"Collection",
                key:"CollectionId",
            },
        },
        PostId:
        {
            type:DataTypes.SMALLINT(),
            references:
            {
                model:"Post",
                key:"PostId",
            },
        }
    },
    {
        tableName:"Collection_Element",
        timestamps:false,
    }
);


export default Collection_Element;
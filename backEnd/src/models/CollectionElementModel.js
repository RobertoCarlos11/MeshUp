import sequelize from "../config/db";
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
            type:DataTypes.SMALLINT();
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

Collection_Element.associate = (models) => 
{
    Collection_Element.hasMany(models.Collection, {foreignKey:"CollectionId", as:"collections"});
    Collection_Element.hasMany(models.Post, {foreignKey:"PostId", as:"Posts"});
};  

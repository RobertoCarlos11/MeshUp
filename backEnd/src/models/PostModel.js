import sequelize from "../config/db.js";
import { DataTypes,NOW } from "sequelize";
import User from "./UserModel.js";
import Model from "./3DFileModel.js";
import Category from "./CategoryModel.js";


const Post = sequelize.define(
    "Post",{
        PostId:{
            type: DataTypes.SMALLINT(),
            primaryKey: true,
            autoIncrement: true,
        },
        Post_Name:{
            type: DataTypes.STRING(50),
            allowNull:false,
        },
        Post_Description:{
            type: DataTypes.STRING(250),
            allowNull:false,
        },
        Post_Date:{
            type: DataTypes.DATE(),
            defaultValue: NOW,
            allowNull:false,
        },
        Post_Status:{
            type: DataTypes.BOOLEAN(),
            defaultValue: true,
        },
        ModelId:{
            type: DataTypes.SMALLINT(),
            allowNull:false,
            references:{
                model:Model,
                key:"ModelId",
            }
        },
        Email:{
            type: DataTypes.STRING(50),
            allowNull:false,
            references:{
                model:User,
                key:"Email",
            }
        },
        CategoryId:{
            type: DataTypes.SMALLINT(),
            allowNull:false,
            references:{
                model:Category,
                key:"CategoryId",
            }
        }
    },
    {
        tableName:"Post",
        timestamps: false
    }
);

export default Post;
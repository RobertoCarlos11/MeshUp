import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const Comment = sequelize.define(
    "Comment",{
        CommentId:{
            type: DataTypes.SMALLINT(),
            primaryKey: true,
            autoIncrement: true,
        },
        Review:{
            type: DataTypes.STRING(250),
            allowNull:false,
        },
        Rating:{
            type: DataTypes.TINYINT(),
            allowNull:false,
        },
        Likes:{
            type: DataTypes.SMALLINT(),
            allowNull:true,
        },
        Email:{
            type: DataTypes.STRING(50),
            allowNull:false,
            references:{
                model:"User",
                key:"Email",
            }
        },
        PostId:{
            type: DataTypes.SMALLINT(),
            allowNull:false,
            references:{
                model:"Post",
                key:"PostId",
            }
        },
    },
    {
        tableName:"Comment",
        timestamps: false
    }
);


export default Comment;
import { Email } from "@mui/icons-material";
import sequelize from "../config/db";
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
        tableName:"´Comment´",
        timestamps: false
    }
);

Comment.associate = (models) => {
    Comment.belongsTo(models.Post,{foreignKey:"PostId", as: "posts"});
    Comment.belongsTo(models.User,{foreignKey:"Email", as: "users"});
}
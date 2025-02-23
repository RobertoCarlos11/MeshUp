import sequelize from "../config/db.js";
import { DataTypes,NOW } from "sequelize";

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
        Likes:{
            type: DataTypes.SMALLINT(),
            allowNull:true,
        },
        Post_Status:{
            type: DataTypes.BOOLEAN(),
            defaultValue: true,
        },
        ModelId:{
            type: DataTypes.SMALLINT(),
            allowNull:false,
            references:{
                model:"Model",
                key:"ModelId",
            }
        },
        Email:{
            type: DataTypes.STRING(50),
            allowNull:false,
            references:{
                model:"User",
                key:"Email",
            }
        },
        CategoryId:{
            type: DataTypes.SMALLINT(),
            allowNull:false,
            references:{
                model:"Category",
                key:"CategoryId",
            }
        }
    },
    {
        tableName:"Post",
        timestamps: false
    }
);

Post.associate = (models)=>{
    Post.hasOne(models.Model,{foreignKey:"ModelId", as: "model"});
    Post.belongsTo(models.User, { foreignKey: "Email", as: "user" });
    Post.hasMany(models.Notification,{foreignKey:"PostId" , as: "notifications"});
    Post.hasMany(models.Category,{foreignKey:"CategoryId" , as: "category"});
    Post.hasMany(models.Comment,{foreignKey:"PostId" , as: "comments"});
};

export default Post;
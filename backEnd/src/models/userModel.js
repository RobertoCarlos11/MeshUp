import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const User = sequelize.define(
    "User",
    {
        Email:{
            type: DataTypes.STRING(50),
            primaryKey:true,
        },
        Username:{
            type: DataTypes.STRING(30),
            allowNull:false,
        },
        Pass:{
            type: DataTypes.STRING(30),
            allowNull:false,
        },
        Profile_Picture:{
            type: DataTypes.BLOB('medium'),
            allowNull:true,
        },
        Birthdate:{
            type: DataTypes.DATE(),
            allowNull:true,
        }
    },
    {
        tableName: "´User´",
        timestamps:false
    }
);

User.associate = (models) => {
    User.hasMany(models.Post,{foreignKey:"Email", as: "posts"});
    User.hasMany(models.Comment,{foreignKey:"Email", as: "comments"});
    User.hasMany(models.Collection,{foreignKey:"Email", as: "collections"});
    User.hasMany(models.SearchHistory,{foreignKey:"Email", as: "searchHistories"});
}

export default User;
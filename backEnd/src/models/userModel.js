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
        tableName: "User",
        timestamps:false
    }
);

export default User;
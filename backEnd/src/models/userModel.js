import { TorusGeometry } from "three";
import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const User = sequelize.define(
    "User",
    {
        UserID:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        Username:{
            type: DataTypes.STRING(100),
            allowNull:true,
        },
        Password:{
            type: DataTypes.STRING(100),
            allowNull:true,
        },
    },
    {
        tableName: "user",
        timestamps:false
    }
);

export default User;
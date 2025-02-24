import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const Notification = sequelize.define(
    "Notification",{
        NotificationId:{
            type: DataTypes.SMALLINT(),
            primaryKey: true,
            autoIncrement: true,
        },
        Matter:{
            type: DataTypes.STRING(50),
            allowNull:false,
        },
        PostId:{
            type: DataTypes.SMALLINT(),
            allowNull:false,
            references:{
                model:"Post",
                key:"PostId",
            }
        },
        Emitter_Email:{
            type: DataTypes.STRING(50),
            allowNull:false,
            references:{
                model:"User",
                key:"Email",
            }
        }
    },
    {
        tableName:"Notification",
        timestamps: false
    }
);


export default Notification;
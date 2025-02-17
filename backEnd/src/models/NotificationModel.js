import sequelize from "../config/db";
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

Notification.associate = (models) => {
    Notification.belongsTo(models.Post,{foreignKey:"PostId", as: "posts"});
    Notification.belongsTo(models.User,{foreignKey:"Emitter_Email", as: "users"});
}
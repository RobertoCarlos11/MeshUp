import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const Likes = sequelize.define("like",
    {
        LikeId:{
            type:DataTypes.INTEGER(),
            autoIncrement:true,
            primaryKey:true,
        },
        Email:{
            type: DataTypes.STRING(50),
            allowNull:false,
            references:{
                model:"User",
                key:"Email",
            }
        },
        ThingLikedId:{
            type: DataTypes.SMALLINT(),
            allowNull:false,
        },
        ThingLiked:{
            type: DataTypes.ENUM(["post","comment"]),
            allowNull:false,
        },
        Status:{
            type:DataTypes.BOOLEAN(),
            defaultValue: true,
            allowNull:false,
        }
    },
    {
        tableName:"like",
        timestamps:false,
    }
);

export default Likes;
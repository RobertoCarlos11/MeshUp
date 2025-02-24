import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const SearchHistory = sequelize.define(
    "SearchHistory",{
        HistoryId:{
            type: DataTypes.SMALLINT(),
            primaryKey: true,
            autoIncrement: true,
        },
        Search:{
            type: DataTypes.STRING(50),
            allowNull:false,
        },
        Search_Date:{
            type: DataTypes.DATE(),
            allowNull:true,
        },
        Searh_Status:{
            type: DataTypes.BOOLEAN(),
            defaultValue: true,
        },
        Email:{
            type: DataTypes.STRING(50),
            allowNull:false,
            references:{
                model:"User",
                key:"Email",
            }
        }
    },
    {
        tableName:"Search_History",
        timestamps: false
    }
);

export default SearchHistory;
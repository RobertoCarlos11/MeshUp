import { Description } from "@mui/icons-material";
import sequelize from "../config/db";
import { DataTypes } from "sequelize";

const Category = sequelize.define(
    "Category",
    {
        CategoryId:{
            type: DataTypes.SMALLINT(),
            primaryKey: true,
            autoIncrement: true,
        },
        Category_Name:{
            type: DataTypes.STRING(30),
            allowNull:true,
        },
        Category_Description:{
            type: DataTypes.STRING(100),
            allowNull: true,
        }
    },
    {
        tableName:"Category",
        timestamps: false
    }
);

Category.associate = (models) => {
    Category.hasMany(models.Post,{foreignKey:"CategoryId", as: "posts"});
}

export default Category;
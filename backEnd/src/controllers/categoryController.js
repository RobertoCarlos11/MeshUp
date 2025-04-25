import Category from "../models/CategoryModel.js";

export const GetAllCategories = async (req,res) =>
{
    try{
    const categoriesFound = await Category.findAll();

    const payload = {
        status: true,
        data: categoriesFound,
        message: "Categories fetched correctly",
    };

    res.json(payload);
    }
    catch(error)
    {
        console.error("Error fetching categories:", error);
        res.status(500).json(error);
    }
}
import apiClient from "../context/apiClient";

export const GetAllCategories = async () => 
{
    try{
        const response = await apiClient.get("/api/category/");

        return response.data;
    }
    catch(error)
    {
        throw error.response?.data || error.message;
    }
}
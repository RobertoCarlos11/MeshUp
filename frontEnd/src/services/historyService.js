import apiClient from "../context/apiClient";

export const CreateSearch = async (Search, Search_Date,Email) => {
    try{
        const response = await apiClient.post("/api/history/",{
            Search: Search,
            Search_Date: Search_Date,
            Email: Email,
        });

        return response.data;
    }
    catch(error)
    {
        throw error.response?.data || error.message;
    }
}
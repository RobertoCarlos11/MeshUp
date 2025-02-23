import apiClient from "../context/apiClient";

export const CreatePost = async (PostInfo) => 
{
    try
    {
    const response = await apiClient.post("/api/post/", PostInfo);

    return response.data;
    }
    catch(error)
    {
        throw error.response?.data || error.message;
    }
}
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

export const GetAllPosts = async (CategoryId = 0) => 
{
    console.log(CategoryId);
    try
    {
        const response = await apiClient.get(`/api/post/posts/${CategoryId}`);
        return response.data;
    }
    catch(error)
    {
        throw error.response?.data || error.message;
    }
}

export const GetPost = async (PostId) => 
{
    try
    {
        const response = await apiClient.get(`/api/post/${PostId}`);
        return response.data;
    }
    catch(error){
        throw error.response?.data || error.message;
    }
}
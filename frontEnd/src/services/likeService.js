import apiClient from "../context/apiClient";

export const GetLikes = async (thingLiked, thingLikedId) => 
{
    try{
        const response = await apiClient.get(`/api/like/${thingLiked}/${thingLikedId}`);
        
        return response.data;
    }
    catch(error)
    {
        throw error.response?.data || error.message;
    }
} 
import apiClient from "../context/apiClient";

export const GetLikes = async (thingLiked, thingLikedId,email) => 
{
    try{
        const response = await apiClient.get(`/api/like/${thingLiked}/${thingLikedId}/${email}`);
        
        return response.data;
    }
    catch(error)
    {
        throw error.response?.data || error.message;
    }
} 

export const InsertLike = async (thingLiked, thingLikedId, Email) => 
{
    try{
        const response = await apiClient.post("/api/like",{
            thingLiked: thingLiked,
            thingLikedId: thingLikedId,
            Email: Email,
        });

        return response.data;
    }
    catch(error)
    {
        throw error.response?.data || error.message;
    }
}

export const UpdateLike = async(thingLiked, thingLikedId, Email, Status) => 
{
    try{
        const response = await apiClient.put("/api/like",{
            thingLiked: thingLiked,
            thingLikedId: thingLikedId,
            Email: Email,
            status: Status,
        });

        return response.data;
    }
    catch(error)
    {
        throw error.response?.data || error.message;
    }
}
import apiClient from "../context/apiClient";

export const CreateComment = async (review, rating, postId, email) =>
{
    try
    {
        const response = await apiClient.post("/api/comment/",{
        review: review,
        email: email,
        postId: postId,
            rating: rating,
        });
    
        return response.data;
    }
    catch(error)
    {
        throw error.response?.data || error.message;
    }
}

export const getComments = async (PostId) =>
{
    try{
        const response = await apiClient.get(`/api/comment/${PostId}`);

        return response.data;
    }
    catch(error)
    {
        throw error.response?.data || error.message;
    }
} 
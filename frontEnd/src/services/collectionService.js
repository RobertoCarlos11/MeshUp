import apiClient from "../context/apiClient";

export const InsertCollection = async (collectionName, email, postId) =>{
    try{
        const response = await apiClient.post(`/api/collection/`, {
            email: email,
            collectionName: collectionName,
            postId: postId
        });
        return response.data;
    }catch(error){
        throw error.response?.data || error.message;
    }
}

export const InsertCollectionElement = async (collectionId, postId) =>{
    try{
        const response = await apiClient.post(`/api/collection/${collectionId}`, {
            PostId: postId
        });
        return response.data;
    }catch(error){
        throw error.response?.data || error.message;
    }
}

export const getCollections = async (email) => {
    try{
        const response = await apiClient.get(`/api/collection/${email}`);
        return response.data;
    }catch(error){
        throw error.response?.data || error.message;
    }
}
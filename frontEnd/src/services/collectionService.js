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
        const response = await apiClient.post(`/api/collection/${collectionId}/${postId}`);
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

export const getCollectionElements = async (collectionId) => {
    try{
        const response = await apiClient.get(`/api/collection/collection/${collectionId}`);
        return response.data;
    }catch(error){
        throw error.response?.data || error.message;
    }
}

export const getSavesOfPost = async (PostId) => {
    try{
        const response = await apiClient.get(`/api/collection/saves/${PostId}`);
        return response.data;
    }
    catch(error)
    {
        throw error.response?.data || error.message;
    }
}

export const updateCollection = async (collectionName, collectionId) => {
    try{
        const response = await apiClient.put(`/api/collection/update/${collectionName}/${collectionId}`)
        return response.data;
    }catch(error){
        throw error.response?.data || error.message;
    }
}

export const deleteCollection = async (collectionId) => {
    try {
        const response = await apiClient.put(`/api/collection/${collectionId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const deleteElement = async (postId, collectionId) => {
    try{
        const response = await apiClient.put(`api/collection/${postId}/${collectionId}`);
        return response.data;
    }catch(error){
        throw error.response?.data || error.message;
    }
}
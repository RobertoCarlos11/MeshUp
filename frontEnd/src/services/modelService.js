import apiClient from "../context/apiClient";

export const CreateModel = async (formData) => {
    try {
        const response = await apiClient.post("/api/3DModel/", formData,{
            headers:{
                "Content-Type": "multipart/form-data",
            }
        });
        return response.data;
    }
    catch (error) {
        throw error.response?.data || error.message;
    }
}
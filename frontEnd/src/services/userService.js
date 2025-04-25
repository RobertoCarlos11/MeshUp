import apiClient from "../context/apiClient";

export const getAllUsers = async () => {
    try{
        const response = await apiClient.get("/api/users/");
        return response.data;
    }
    catch(error){
        throw error.response?.data || error.message;
    }
}

export const getUserPhoto = async (Email) => {
    try{
        const response = await apiClient.get(`/api/users/photo/${Email}`);
        return response.data;
    }
    catch(error){
        throw error.response?.data || error.message;
    }
}

export const getUser = async (username) => {
    try{
        const response = await apiClient.get(`/api/users/${username}`);
        return response.data;
    }catch(error){
        throw error.response?.data || error.message;
    }
}

export const userLogIn = async (user, password) => {
    try{
        const response = await apiClient.get(`/api/users/login/${user}/${password}`);
        return response.data;
    }catch(error){
        throw error.response?.data || error.message;
    }
}

export const userRegister = async(user, password, birthdate, email) =>{
    try{
        const response = await apiClient.post(`/api/users/`,{
            user: user,
            password: password,
            birthdate: birthdate,
            email: email,
        });
        return response.data;
    }
    catch(error){
        throw error.response?.data || error.message;
    }
}

export const updateUser = async(UserInfo) => {
    try{
        const response = await apiClient.put(`/api/users/`,UserInfo, {headers:{
            "Content-Type": "multipart/form-data",
        }});

        return response.data;
    }
    catch(error){
        throw error.response?.data || error.message;
    }
}
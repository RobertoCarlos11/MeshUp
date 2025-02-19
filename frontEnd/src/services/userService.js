import apiClient from "../context/apiClient";

export const getUsers = async () => {
    try{
    const response = await apiClient.get("/api/users/");
    return response.data;
    }
    catch(error)
    {
        throw error.response?.data || error.message;
    }
}

export const userLogIn = async (user,password) => {
    try
    {
        const response = await apiClient.get(`/api/users/${user}/${password}`);
        return response.data;
    }
    catch(error)
    {
        throw error.response?.data || error.message;
    }
}

export const userRegister = async(user, password, birthdate, email) =>
{
    try
    {
        const response = await apiClient.post(`/api/users/${user}/${password}/${birthdate}/${email}`);
        return response.data;
    }
    catch(error)
    {
        throw error.response?.data || error.message;
    }
}
import apiClient from "../context/apiClient";

export const getNotifications = async (Email) =>
{
    try{
        const response = await apiClient.get(`/api/notification/${Email}`);

        return response.data;
    }
    catch(error)
    {
        throw error.response?.data || error.message;
    }
}

export const updateNotification = async (NotificationId, status) => 
{
    try{
        const response = await apiClient.put(`/api/notification/`,{
            NotificationId: NotificationId,
            Status: status,
        });

        return response.data;
    }
    catch(error)
    {
        throw error.response?.data || error.message;
    }
}
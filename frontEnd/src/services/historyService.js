import apiClient from "../context/apiClient";

export const CreateSearch = async (Search, Search_Date, Email) => {
    try {
        const response = await apiClient.post("/api/history/", {
            Search: Search,
            Search_Date: Search_Date,
            Email: Email,
        });

        return response.data;
    }
    catch (error) {
        throw error.response?.data || error.message;
    }
}

export const GetSearchHistory = async (Email) => {
    try {
        const response = await apiClient.get(`/api/history/${Email}`);

        return response.data;
    }
    catch (error) {
        throw error.response?.data || error.message;
    }
}

export const DeleteHistory = async (Elements) => {
    try {
        const response = await apiClient.put("/api/history", {
            Elements
        });

        return response.data;
    }
    catch (error) {
        throw error.response?.data || error.message;
    }
}
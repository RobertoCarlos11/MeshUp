import apiClient from "../context/apiClient";

export const GetReports = async (Email = null, Category = null, Status = null, InitialDate = null, FinalDate = null) =>
{
    try{
        const response = await apiClient.get(`/api/reports/${Email}/${Category}/${Status}/${InitialDate}/${FinalDate}`);

        return response.data;
    }
    catch(error)
    {
        throw error.response?.data || error.message;
    }
}
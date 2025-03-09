import SearchHistory from "../models/SearchHistoryModel.js";

export const InsertSearch = async (req,res) => {
    try
    {
        const {Search, Search_Date,Email } = req.body;

        const SearchCreated = await SearchHistory.create({
            Search:Search,
            Search_Date: Search_Date,
            Email: Email,
        });

        const payload = {
            status: SearchCreated ? true : false,
            data: SearchCreated,
            message: SearchCreated ? "Search created successfully!" : "There was an error creating the Search",
        }

        res.json(payload);
    }
    catch(error)
    {
        res.status(500).json(error);
        console.log(error);
    }
}
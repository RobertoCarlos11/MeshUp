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

export const GetSearchHistory = async (req,res) => {
    try{
        const {Email} = req.params;

        const HistoryFound = await SearchHistory.findAll({
            where: {Email: Email,Search_Status:true}
        });

        const payload = {
            status: HistoryFound ? true : false,
            data: HistoryFound,
            message: HistoryFound ? "History found successfully!" : "No history was found",
        }

        res.json(payload);
    }
    catch(error)
    {
        res.status(500).json(error);
        console.log(error);
    }
}

export const DeleteHistory = async (req,res) => {
    try{
        const {Elements} = req.body;

        for (const element of Elements)
        {
            await SearchHistory.update({
                Search_Status: false,
            },
            {where:{HistoryId: element}});
        }

        const payload ={
            status: true,
            message:"Elements deleted from history successfully!",
        }

        res.json(payload);
    }
    catch(error)
    {
        res.status(500).json(error);
        console.log(error);
    }
}
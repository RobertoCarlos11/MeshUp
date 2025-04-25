import Like from "../models/LikeModel.js"
import Post from "../models/PostModel.js"
import Category from "../models/CategoryModel.js";
import { Op } from "sequelize";
import moment from "moment/moment.js";
import dayjs from "dayjs";

export const GetReportOfUser = async (req,res) => {
    try{

        const {Email, category, Status, InitialDate, FinalDate} = req.params;
        const whereCondition = {Email: Email};

        if(Number(category) !== 0)
        {
            whereCondition.CategoryId = Number(category);
        }

        if(Status !== "null")
        {
            whereCondition.Post_Status = Status === "true" ? true : false;
        }
        
        const isValidDate = (dateString) => {
            const date = new Date(dateString);
            return !isNaN(date.getTime());
        };

        if (isValidDate(InitialDate) || isValidDate(FinalDate)) {
            whereCondition.Post_Date = {};
        
            if (isValidDate(InitialDate)) {
                whereCondition.Post_Date[Op.gte] = dayjs(InitialDate, "DD/MM/YYYY").format("YYYY-MM-DD HH:mm:ss");
            }
        
            if (isValidDate(FinalDate)) {
                whereCondition.Post_Date[Op.lte] = dayjs(FinalDate, "DD/MM/YYYY").format("YYYY-MM-DD HH:mm:ss");
            }
        }

        const PostsFound = await Post.findAll({
            where: whereCondition,
            include:{
                model:Category,
                as:"category",
            },
        });
        const payload = {
            status: PostsFound.length > 0 ? true : false,
            message: PostsFound.length > 0 ? "Posts Found Successfully!" : "No Posts where Found",
            data:PostsFound,
        }
        
        res.json(payload);
    }
    catch(error)
    {
        res.status(500).json(error);
        console.log(error);
    }
}
import Notification from "../models/NotificationModel.js";
import Post from "../models/PostModel.js";
import User from "../models/UserModel.js";

export const getNotificationsOfUser = async (req,res) => {
    try{
        const {Email} = req.params;

        const response = await Notification.findAll({
            include:[{
                model: Post,
                as:"posts",
                where:{Email: Email},
                attributes: ["Post_Name"],
            },
            {
                model:User,
                as:"emitter",
                attributes:["Username"],
            }],
            where:{
                Status: false,
            }
        });

        const payload = {
            status: true,
            data: response,
            message: "Notifications fetched successfully!",
        }

        res.json(payload);
    }
    catch(error)
    {
        res.status(500).json(error);
        console.log(error);
    }
}

export const updateNotification = async (req,res) => 
{
    try{

        const {NotificationId, Status} = req.body;
        
        await Notification.update({
            Status: Status,
        },
        {
            where:{
                NotificationId: NotificationId,            
            }
        });
        
        const payload = {
            status: true,
            message: "Notification Updated successfully!",
        }

        res.json(payload);
    }
    catch(error)
    {
        res.status(500).json(error);
        console.log(error);
    }        
}
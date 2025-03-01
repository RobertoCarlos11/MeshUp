import Like from "../models/LikeModel.js"

export const GetLikes = async (req,res) => 
{
    try
    {
        const {thingLiked, thingLikedId} = req.params;
        const likesFound = await Like.findAndCountAll({
            where:{
                ThingLiked: thingLiked,
                ThingLikedId:  thingLikedId
            }
        });
        
        const payload = {
            status: likesFound ? true : false,
            message: likesFound ? `Likes found for ${thingLiked} successfully` : `No Post or comment with that id was found with likes`, 
            data: likesFound,
        }
        
        res.json(payload);
    }
    catch(error)
    {
        res.status(500).json(error);
        console.log(error);
    }
}
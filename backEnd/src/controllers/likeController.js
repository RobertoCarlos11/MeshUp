import Like from "../models/LikeModel.js"

export const GetLikes = async (req,res) => 
{
    try
    {
        const {thingLiked, thingLikedId,email} = req.params;
        const likesFound = await Like.findAndCountAll({
            where:{
                ThingLiked: thingLiked,
                ThingLikedId:  thingLikedId,
                Status: true,
            }
        });
        
        const UserLiked = await Like.findOne({
            where:{
                ThingLiked: thingLiked,
                ThingLikedId:  thingLikedId,
                Email: email,
            }
        });

        const payload = {
            status: likesFound ? true : false,
            message: likesFound ? `Likes found for ${thingLiked} successfully` : `No Post or comment with that id was found with likes`, 
            data: likesFound,
            UserLiked: UserLiked,
        }
        
        res.json(payload);
    }
    catch(error)
    {
        res.status(500).json(error);
        console.log(error);
    }
}

export const InsertLike = async (req,res) => 
{
    try{
        const {thingLiked, thingLikedId, Email} = req.body;

        const PostLiked = await Like.create({
            Email:Email,
            ThingLikedId: thingLikedId,
            ThingLiked: thingLiked,
        });

        const payload = {
            status: true,
            message: `${thingLiked} liked successfully!`,
            data: PostLiked,
        }

        res.json(payload);
    }
    catch(error)
    {
        res.status(500).json(error);
        console.log(error);
    }
}

export const UpdateLike = async (req,res) => 
{
    try{
        const {thingLiked, thingLikedId, Email,status} = req.body;
        
        await Like.update({
            Status: status
        },
        {
            where:{
                Email:Email,
                ThingLikedId: thingLikedId,
                ThingLiked: thingLiked,
            },
        }
        );

        const payload = {
            status: true,
            message: `${thingLiked} updated Successfully!`,
        }

        res.json(payload);
    }
    catch(error)
    {
        res.status(500).json(error);
        console.log(error);
    }
}
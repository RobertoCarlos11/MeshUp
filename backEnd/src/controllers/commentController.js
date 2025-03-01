import Comment from "../models/CommentModel.js"
import User from "../models/UserModel.js";

export const InsertComment = async (req,res) => 
{
    try{

        const {review, rating, postId, email} = req.body;
        
        await Comment.create({
            Review: review,
            Rating: rating,
            PostId: postId,
            Email: email,
        });
        
        const payload = {
        status: true,
        message: "Comment created successfully",
    }
    
    res.json(payload);
    }
    catch(error)
    {
        res.status(500).json(error);
        console.log(error);
    }
}

export const getComments = async (req,res) => 
{
    try
    {
    const {postId} = req.params;

    const CommentsFound = await Comment.findAll({
        where: {
            PostId: postId,
        },
        include:{
            model: User,
            as:"user",
            attributes: ["Email", "Username", "Profile_Picture"],
        }
    });

    const payload = {
        status: true,
        data: CommentsFound,
        message: "Comments found successfully",
    }

    res.json(payload);
    }
    catch(error)
    {
        res.status(500).json(error);
    }
}
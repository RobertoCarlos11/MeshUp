import Post from "../models/PostModel.js"
import User from "../models/UserModel.js"
import Model from "../models/3DFileModel.js"
export const InsertPost = async (req,res) => 
{
    try
    {
        const {title, description, categorySelected, email, modelId} = req.body;
    
        await Post.create({
            Post_Name: title,
            Post_Description: description,
            ModelId: modelId,
            CategoryId: categorySelected,
            Email: email,
        });
    
        const payload = {
            status:true,
            message:"Post registered succesfully",
        }
    
        res.json(payload);
    }
    catch(error)
    {
        res.status(500).json(error);
        console.log(error);   
    }
} 

export const GetAllPosts = async (req,res) => 
{
    try
    {
        const PostsFound = await Post.findAll({
            include: [{
            model: User,
            as: "user"
            },
            {
            model: Model,
            as:"model",
            }
        ],
        });

        const payload = {
            status: true,
            data: PostsFound,
            message: "Posts fetched correctly",
        }

        res.json(payload);
    }
    catch(error)
    {
        res.status(500).json(error);
        console.log(error);
    }
}
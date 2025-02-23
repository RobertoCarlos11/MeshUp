import Post from "../models/PostModel.js"

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
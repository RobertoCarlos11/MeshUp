import Post from "../models/PostModel.js"
import User from "../models/UserModel.js"
import Model from "../models/3DFileModel.js"
import Comment from "../models/CommentModel.js"
export const InsertPost = async (req, res) => {
    try {
        const { title, description, categorySelected, email, modelId } = req.body;

        const postCreated = await Post.create({
            Post_Name: title,
            Post_Description: description,
            ModelId: modelId,
            CategoryId: categorySelected,
            Email: email,
        });

        const payload = {
            status: true,
            message: "Post registered succesfully",
            data: postCreated,
        }

        res.json(payload);
    }
    catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
}

export const GetAllPosts = async (req, res) => {
    try {

        const PostsFound = await Post.findAll({
            include: [{
            model: User,
            as: "user"
            },
            {
            model: Model,
            as: "model",
            },
            {
            model: Comment,
            as:"comments",
            attributes:["Rating"],
            }
            ],
            where: req.params.CategoryId === "0" ?  {}: { CategoryId : req.params.CategoryId },
        });

        const payload = {
            status: true,
            data: PostsFound,
            message: "Posts fetched correctly",
        }

        res.json(payload);
    }
    catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
}

export const getPostsOfUser = async(req,res) =>
{
    try{
        const {Email} = req.params;
        const response = await Post.findAll({
            where:{
                Email:Email,
            },
            include:[{
                model: Model,
                as:"model",
            },{
                model:Comment,
                as:"comments",
                attributes: ["Rating"],
            }]
        });

        const payload = {
            status: true,
            data: response,
            message:`Posts of user ${Email} fetched successfully`,
        }

        res.json(payload);
    }
    catch(error)
    {
        res.status(500).json(error);
        console.log(error);
    }
}
export const getPost = async (req, res) => {
    const { postId } = req.params;
    try {
        const PostFound = await Post.findOne({
            where: {
                PostId: postId,
            },
            include: [{
                model: User,
                as: "user",
                attributes:["Username", "Email"],
            }, {
                model: Model,
                as: "model",
            },
            {
                model: Comment,
                as: "comments",
                include:[{
                    model:User,
                    as:"user",
                    attributes:["Username", "Profile_Picture","Email"],
                }]
            }]
        });

        const payload = {
            status: PostFound ? true : false,
            data: PostFound,
            message: PostFound ? "Post fetched Correctly" : "No Post exists with that PostId",
        }

        res.json(payload);
    }
    catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
}
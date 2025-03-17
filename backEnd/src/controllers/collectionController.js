import Collection from "../models/CollectionModel.js";
import Collection_Element from "../models/CollectionElementModel.js";
import Model from "../models/3DFileModel.js";
import Post from "../models/PostModel.js";
import User from "../models/UserModel.js";
import Comment from "../models/CommentModel.js";

export const InsertCollection = async (req,res) => {
    try{
        const { collectionName, email , postId} = req.body;
        
        const newCollection = await Collection.create({
            Collection_Name: collectionName,
            Email: email
        });

        const collectionId = newCollection.CollectionId;

        await Collection_Element.create({
            CollectionId: collectionId,
            PostId: postId 
        });
        
        const payload = {
            status: true,
            message: "Collection created sucessfully"
        } 
        
        res.json(payload);
        
    }catch(error){
        res.status(500).json(error);
        console.log(error);
    }
}

export const InsertCollectionElement = async (req,res) => {
    try{
        const { postId, collectionId } = req.params;
    
        const existingPost = await Collection_Element.findAll({
            where:{ 
                CollectionId: collectionId,
                PostId: postId
            }
        });

        let status;

        if(existingPost.length){
            const elementStatus = existingPost[0].dataValues.CollectionElement_Status;
            if(elementStatus == true){
                status = false;
            }else{
                status = true; 
                await Collection_Element.update(
                    { CollectionElement_Status: 1},
                    { where: {
                        CollectionId: collectionId,
                        PostId: postId 
                    }}
                );
            }  
        }else{
            status = true; 
            await Collection_Element.create({
                CollectionId: collectionId,
                PostId: postId 
            });
        }
        const payload = {
            status: status,
            message: status == true? "Collection Element created sucessfully" : "Repeated Collection Element"
        }
        
        res.json(payload);

    }catch(error){
        res.status(500).json(error);
        console.log(error);
    }
}

export const getCollections = async (req, res) => {
    try{
        const { email } = req.params;

        const response = await Collection.findAll({
            where:{ 
                Email: email,
                Collection_Status: 1
            },
            include:{
                model:Collection_Element,
                as:"elements",
                where:{ CollectionElement_Status: 1 },
                include:
                {
                model:Post,
                as:"post",
                include:{
                    model:Model,
                    as:"model",
                }
                },
                limit:4,
            }
        });

        const payload = {
            status: true,
            data: response,
            message: `${email} Collections fetched sucessfully`
        }

        res.json(payload);

    }catch(error){
        res.status(500).json(error);
        console.log(error);
    }
}

export const getCollectionElements = async (req, res) => {
    try {
        const { collectionId } = req.params;

        const response = await Post.findAll({
            include: [{
                model: Collection_Element,
                as: "collectionElements",
                where: { 
                    CollectionId: collectionId,
                    CollectionElement_Status: 1
                },
                attributes: ["ElementId"],
                include:[{
                model: Collection,
                as: "collection",
                attributes: ["Collection_Status"],
                }],
            },
            {
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
            }]
        });

        const CollectionName = await Collection.findOne({
            where:{ CollectionId: collectionId }
        });
        const payload = {
            status: true,
            data: response,
            message: `Collection elements with collectionId ${collectionId} fetched successfully`,
            CollectionName: CollectionName.Collection_Name,
        };

        res.json(payload);

    } catch (error) {
        res.status(500).json({ status: false, message: "Internal server error", error });
        console.error(error);
    }
}

export const getSavesOfPost = async (req,res) => {
    try{
        const {PostId} = req.params;

        const SavesFound = await Collection_Element.findAndCountAll({
            where:{ 
                PostId:PostId,
            }
        });

        const payload = {
            status: SavesFound ? true : false,
            data: SavesFound,
            message: SavesFound ? "Saves found for post successfully" : "No Saves where found",
        }

        res.json(payload);
    }   
    catch(error)
    {
        res.status(500).json(error);
        console.log(error);
    }
}

export const updateCollection = async (req,res) => {
    try{
        const { collectionName, collectionId } = req.body;

        await Collection.update(
            { Collection_Name: collectionName },
            { where:{ CollectionId: collectionId} } 
        );

        const payload ={
            status: true,
            message: `Collection name ${collectionName} changed`
        }

        res.json(payload);

    }catch(error){
        res.status(500).json(error);
        console.log(error);
    }
}
 
export const deleteCollection = async (req, res) => {
    try{
        const { collectionId } = req.body;

        await Collection.update(
            { Collection_Status: 0 },
            { where:{ CollectionId: collectionId } }
        );

        const payload = {
            status: true,
            message: "Sucessfully deleted collection"
        }

        res.json(payload);

    }catch(error){
        res.status(500).json(error);
        console.log(error);
    }
}

export const deleteElement = async (req, res) => {
    try{
        const {collectionId, postId} = req.body;

        console.log(collectionId, postId);
        await Collection_Element.update(
            { CollectionElement_Status: 0 },
            { where: { 
                CollectionId: collectionId,
                PostId: postId 
            }}
        );
    
        const CollectionName = await Collection.findOne({
            where:{ CollectionId: collectionId },
            attributes: ["Collection_Name"]
        });
        const payload = {
            status: true,
            message: "Sucessfully deleted element from collection",
            collection_name: CollectionName.Collection_Name,
        }

        res.json(payload);

    }catch(error){
        res.status(500).json(error);
        console.log(error);
    }
}
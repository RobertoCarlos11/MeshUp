import Collection from "../models/CollectionModel.js";
import Collection_Element from "../models/CollectionElementModel.js";
import Model from "../models/3DFileModel.js";
import Post from "../models/PostModel.js";
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
        const { collectionId, postId } = req.params;
    
        const existingPost = await Collection_Element.findAll({
            where:{ 
                CollectionId: collectionId,
                PostId: postId 
            }
        });

        let status;

        if(existingPost.length){
            status = false;
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

export const deleteCollection = async (req, res) => {
    try{
        const { collectionId } = req.params;

        await Collection.update(
            { Collection_Status: 0 },
            { where:{ collectionId: collectionId },}
        );

        const payload = {
            status: true,
            message: "Sucessfully deleted collection"
        }

        res.json(payload);

    }catch(error){
        res.status(500).json(error);
        console.los(error);
    }
}
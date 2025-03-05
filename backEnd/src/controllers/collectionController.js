import Collection from "../models/CollectionModel.js";
import Collection_Element from "../models/CollectionElementModel.js";

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
        const { collectionId } = req.params;
        const { postId } = req.body;

        await Collection_Element.create({
            CollectionId: collectionId,
            PostId: postId 
        });

        const payload = {
            status: true,
            message: "Collection Element created sucessfully"
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
            where:{ Email: email }
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
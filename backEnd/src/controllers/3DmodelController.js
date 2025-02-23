import Model from "../models/3DFileModel.js"
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage()});

export const InsertModel = async (req,res) =>
{
    try
    {
        if (!req.files || !req.files["model"] || !req.files["texture"]) {
            return res.status(400).json({ status: false, message: "Missing files" });
        }

        const modelBuffer = req.files["model"][0].buffer;        
        const textureBuffer = req.files["texture"][0].buffer;        

        const ModelCreated = await Model.create({
            Model: modelBuffer,
            Texture: textureBuffer,
        });

        const payload = {
            status: true,
            data: ModelCreated.ModelId,
            message:"Model registered succesfully",
        }
        res.json(payload);
    }
    catch(error)
    {
        res.status(500).json(error);
        console.log(error);   
    }
}
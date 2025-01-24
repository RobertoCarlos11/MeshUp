import userModel from '../models/userModel.js';

export const getAllUsers = async (req,res) => {
    try{
        const users = await userModel.getUsers();
        const payload = {
            status: true,
            message: "Users fetched correctly",
            data: users,
        };
        res.json(payload);
    }
    catch(error)
    {
        res.status(500).json(error);
    }
}

export const userLogIn = async (req, res) => {
    try{
        const userFound = await userModel.logIn(req.params.user,req.params.password);
        const payload = {
            status: userFound ? true : false,
            message: userFound ? "User Found" : "User Not Found",
            data: userFound
        }
        res.json(payload);
    }
    catch(error)
    {
        res.status(500).json(error);
    }
}
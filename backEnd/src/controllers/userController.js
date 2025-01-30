import { where } from 'sequelize';
import User from '../models/userModel.js';

export const getAllUsers = async (req,res) => {
    try{
        const users = await User.findAll();
        
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
        const {user, password} = req.params;
        const userFound = await User.findOne({where:
            {
            Username: user,
            Password: password,
            }}
        );
        
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
        console.log(error);
    }
}
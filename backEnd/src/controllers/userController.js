import { where, Op } from 'sequelize';
import User from '../models/UserModel.js';
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();

        const payload = {
            status: true,
            message: "Users fetched correctly",
            data: users,
        };
        res.json(payload);
    }
    catch (error) {
        res.status(500).json(error);
    }
}

export const userLogIn = async (req, res) => {
    try {
        const { user, password } = req.params;
        const userFound = await User.findOne({
            where:
            {
                [Op.or]: [
                    { Username: user },
                    { Email: user }
                ],
                Pass: password,
            }
        }
        );

        const payload = {
            status: userFound ? true : false,
            message: userFound ? "User Found" : "User Not Found",
            data: userFound
        }
        res.json(payload);
    }
    catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
}

export const userRegister = async (req, res) => {
    try {
        const { user, password, birthdate, email } = req.body;
        await User.create({
            Username: user,
            Pass: password,
            Email: email,
            Birthdate: birthdate,
            Profile_Picture: null
        });

        const payload = {
            status: true,
            message: "User registered successfully",
        };
        res.json(payload);
    }
    catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
}

export const userUpdate = async (req, res) => {
    try {
        const { Username,Pass,Birthdate,Email,Profile_Picture } = req.body;

        let ProfilePictureBuffer = null;
        if(!Profile_Picture)
        {
            ProfilePictureBuffer = req.files["Profile_Picture"][0].buffer;
        }

        await User.update(
            {
                Username: Username,
                Pass: Pass,
                Birthdate: Birthdate,
                Profile_Picture: ProfilePictureBuffer === null ? {} : ProfilePictureBuffer,
            },
            {
                where: { Email: Email },
            }
        );


        const payload = {
            status: true,
            message: "User updated successfully",
        };
        res.json(payload);
    }
    catch(error)
    {
        res.status(500).json(error);
        console.log(error);
    }
}
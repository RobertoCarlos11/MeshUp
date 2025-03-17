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
    }catch(error) {
        res.status(500).json(error);
    }
}

export const getUser = async (req,res) => 
{
    try
    {
        const {Email} = req.params;
        const user = await User.findOne({
            where:{
                Email: Email,
            },
            attributes: { exclude: ["Pass"] },
        });

        const payload=
        {
            status:"true",
            message:"User Fetched successfully!",
            data: user,
        }

        res.json(payload);
    }
    catch(error)
    {
        res.status(500).json(error);
        console.log(error);
    }
}

export const userLogIn = async (req, res) => {
    try {
        const { user, password } = req.params;
        const userFound = await User.findOne({
            where:{
                [Op.or]: [
                    { Username: user },
                    { Email: user }
                ],
                Pass: password,
            },
            attributes: { exclude: ["Profile_Picture"] },
        });

        const payload = {
            status: userFound ? true : false,
            message: userFound ? "User Found" : "User Not Found",
            data: userFound
        }
        res.json(payload);
    }catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
}

export const userRegister = async (req, res) => {
    try {
        const { user, password, birthdate, email } = req.body;
        const existingUser = await User.findAll({
            where: {
                [Op.or]: [
                    { Username: user },
                    { Email: email }
                ]
            }
        });
        
        let message;
        let status;

        if (existingUser.length) {
            const usernameTaken = existingUser.some(u => u.Username === user);
            const emailTaken = existingUser.some(u => u.Email === email);

            if (usernameTaken && emailTaken) {
                message = "Email and Username already registered!";
            } else if (usernameTaken) {
                message = "Username already registered!";
            } else {
                message = "Email already registered!";
            }
            status = false;
        } else {
            await User.create({
                Username: user,
                Pass: password,
                Email: email,
                Birthdate: birthdate,
                Profile_Picture: null
            });
            message = "User registered successfully!";
            status = true;
        }
        const payload = {
            status: status,
            message: message
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

        console.log(`Username: ${Username}, Pass: ${Pass}, Birthdate: ${Birthdate}, Email: ${Email}, Profile_Picture: ${Profile_Picture}`);
        let ProfilePictureBuffer = null;
        if(!Profile_Picture && !(req.files["Profile_Picture"] === undefined))
        {
            ProfilePictureBuffer = req.files["Profile_Picture"][0].buffer;
        }

        const ExistingUser = await User.findOne({
            where:{ [Op.or]:{
                Username: Username,
            },}
        });
        
        console.log(ExistingUser);
        const SameUser = ExistingUser?.Email === Email;
        let payload;
        console.log(SameUser);

        if(SameUser || ExistingUser === null)
        {
        await User.update(
            {
            Username: Username,
            Pass: Pass,
            Birthdate: Birthdate,
            Profile_Picture: ProfilePictureBuffer === null ? User.Profile_Picture : ProfilePictureBuffer,
            },
            {
            where: { Email: Email },
            }
        );

        const UserUpdated = await User.findOne({
            where: { Email: Email },
        });

        console.log(UserUpdated);
        payload = {
            status: true,
            message: "User updated successfully",
            data: UserUpdated,
        };
        }
        else{
        payload = {
            status: false,
            message: "Username or Email already exists",
        }
    }
    res.json(payload);
    }
    catch(error)
    {
        res.status(500).json(error);
        console.log(error);
    }
}

export const getUserPhoto = async (req, res) => {
    try {
        const { Email } = req.params;
        const user = await User.findOne({
            where: {
                Email: Email,
            }
        });
        const payload = {
            status: true,
            message: "User photo fetched correctly",
            data: user.Profile_Picture,
        };
        res.json(payload);
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
}
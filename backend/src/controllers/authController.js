import bcrypt from "bcryptjs";
import {
    createUser,
    findUserByEmail,
} from "../repositories/userRepository.js";
import generateToken from "../utils/generateToken.js";
export const register = async (req, res) => {
    try {
        const { firstname, lastname, username, email, password } = req.body;
        const userExists = await findUserByEmail(email);
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await createUser({
            firstname,
            lastname,
            username,
            email,
            password: hashedPassword,

        });
        res.status(201).json({
            message: "User Registered",
            token : generateToken(user),
        });
    } catch(error){
        res.status(500).json({message: error.message});
    }
};
export const login = async(req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await findUserByEmail(email);
        if(!user){
            return res.status(400).json({message: "Invalid Email"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch){
            return res.status(400).json({message:"Invalid Password"});

        }
        res.json({
            message: "Login Successfull",
            token: generateToken(user),
        });
    }catch(error){
        res.status(500).json({message: error.message});
    }
};
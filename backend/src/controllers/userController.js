import * as userRepo from "../repositories/userRepository.js";

// GET ALL USERS
export const getAllUsers = async(req,res)=>{
    try{
        const users = await userRepo.getAllUsers();
        res.status(200).json(users);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
};
// GET USER BY ID
export const getUser = async(req,res)=>{
    try{
        const user = await userRepo.getUserById(req.params.id);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        res.status(200).json(user);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
};
// UPDATE USER
export const updateUser = async(req,res)=>{
    try{
        const updatedUser = await userRepo.getUserByIdAndUpdate(req.params.id,req.body);
        res.status(200).json(updatedUser);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
};
// DELETE USER
export const deleteUser = async(req,res)=>{
    try{
        // USER FIND KARO ID SE
        const user = await userRepo.getUserById(req.params.id);
        // CHECK IF USER H YA NAHI
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        // USER DELETE KARO 
        await userRepo.deleteUser(req.params.id);
        res.json({message:"User deleted successfully"});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
};
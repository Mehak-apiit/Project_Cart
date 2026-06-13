import User from "../models/userModel.js";
// CREATE USER
export const createUser = async(data)=>{
    return await User.create(data);
};
// GET ALL USERS
export const getAllUsers = async()=>{
    return await User.find();
};
// GET USER BY ID
export const getUserById = async(id)=>{
    return await User.findById(id);
};
// FIND BY EMAIL ID
export const findUserByEmail = async(email) =>{
    return await User.findOne({email});
};
// UPDATE USER
export const getUserByIdAndUpdate = async(id,data)=>{
    return await User.findByIdAndUpdate(id,data,{new:true});
};
// DELETE USER
export const deleteUser = async(id)=>{
    return await User.findByIdAndDelete(id);
};
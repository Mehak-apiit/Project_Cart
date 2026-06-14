import Category from "../models/categoryModel.js";
// CREATE
export const createCategory = async(data) =>{
    return await Category.create(data);
};
// GET ALL THE CATEGORIES
export const getAllCategories = async()=>{
    return await Category.find();
};
// GET ONE CATEGORY BY ID
export const getCategoryById = async(id) =>{
    return await Category.findById(id);
};
//UPDATE THE CATEGORY
export const updateCategory = async(id,data) =>{
    return await Category.findByIdAndUpdate(id,data,{new:true});
};
// DELETE CATEGORY
export const deleteCategory = async(id) =>{
    return await Category.findByIdAndDelete(id);
};
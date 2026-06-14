import * as categoryRepo from "../repositories/categoryRepository.js";
// Create
export const createCategory = async(req,res)=>{
    try {
        const category = await categoryRepo.createCategory(req.body);
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({message: "Category created successfully"});
    }
};
// Get all the category 
export const getAllCategories = async(req,res) =>{
    try {
        const allCategories = await categoryRepo.getAllCategories();
        res.json(allCategories);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
// Get one Category By Id
export const getCategoryById = async(req,res) =>{
    try{
        const category = await categoryRepo.getCategoryById(req.params.id);
        res.json(category);
    }catch(error){
        res.status(500).json({message:error.message});

    }
};
// Update the category
export const updateCategory = async(req,res) =>{
    try {
        const updatedCategory = await categoryRepo.updateCategory(req.params.id,req.body);
        res.json(updatedCategory);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
// Delete category
export const deleteCategory = async(req,res) =>{
    try {
        await categoryRepo.deleteCategory(req.params.id);
        res.json({message:"Category deleted"});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};
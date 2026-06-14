import Product from "../models/productModel.js";
// Create product
export const createProduct = async(data) =>{
    return await Product.create(data);
};
// Get all the Products
export const getAllProducts = async()=>{
    return await Product.find();
};
// Get only one product
export const getProductById = async(id) =>{
    return await Product.findById(id);
};
// Update product
export const updateProduct = async(id,data) =>{
    return await Product.findByIdAndUpdate(id,data,{new: true});
};
// Delete product
export const deleteProduct = async(id) =>{
    return await Product.findByIdAndDelete(id);
};
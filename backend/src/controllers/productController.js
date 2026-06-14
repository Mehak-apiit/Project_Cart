import * as ProductRepo from "../repositories/productRepository.js";
// Create Product
export const createProduct = async(req,res)=>{
    try{
        const product  = await ProductRepo.createProduct(req.body);
        res.status(201).json(product);
    }catch(error){
        res.status(500).json({message:error.message});
    }
};

// Get all products
export const getAllProducts = async(req,res) =>{
    try{
        const products = await ProductRepo.getAllProducts();
        res.json(products);
    }catch(error){
        res.status(500).json({message:error.message})
    }
};
// Get one product by product id
export const getProductById = async(req,res) =>{
    try{
        const product = await ProductRepo.getProductById(req.params.id);
        res.json(product);
    }catch(error){
        res.status(500).json({message:error.message});
    }
};
// Update product
export const updateProduct = async(req,res) =>{
    try{
        const updatedProduct = await ProductRepo.updateProduct(req.params.id,req.body);
        res.json(updatedProduct);
    }catch(error){
        res.status(500).json({message: error.message});
    }
};
// Delete product
export const deleteProduct = async(req,res) =>{
    try{
        await ProductRepo.deleteProduct(req.params.id);
        res.json({message:"Product deleted"});
    }catch(error){
        res.status(500).json({message:error.message});
    }
};
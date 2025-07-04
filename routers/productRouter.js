
import express from 'express'
import { addProduct, 
  getProductsbyId, 
  getProductsByIdAndUpdate, 
  showAllproducts,
  getProductByIdAndDelete } from '../controllers/ProductController.js';


export const productrouter=express.Router();


// @ api:-dsc (add || showallProducts || findbyID || updatebyID || deleteByID)

// @add product=>/add
productrouter.post("/add",addProduct)

// show all products
productrouter.get("/allproducts",showAllproducts)

// get products by id
productrouter.get("/:id",getProductsbyId)

// get products by id and update
productrouter.put("/update/:id",getProductsByIdAndUpdate)

// get products by id and update
productrouter.put("/delete/:id",getProductByIdAndDelete)
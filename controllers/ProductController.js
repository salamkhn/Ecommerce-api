import mongoose from "mongoose";
import { productModel } from "../models/productModel.js";

// add product
export const addProduct = async (req, res) => {
  try {
    const { name } = req.body;
    const isExist = await productModel.findOne({ name });
    if (isExist) {
      res.status(400).json({
        message: "product already found",
        success: false,
      });
    }
    const data = Array.isArray(req.body) ? req.body : [req.body];
    const product = await productModel.insertMany(data);

    if (product) {
      return res.status(201).json({
        message: "product is saved successfully to database",
        success: false,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "error during adding product",
      error: err.message,
      success: true,
    });
  }
};

// show all products

export const showAllproducts = async (req, res) => {
  try {
    const users = await productModel.find();
    if (users) {
      return res.status(200).json({
        message: "all products",
        users: users,
        success: true,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

// GET PRODUCTS BY ID
export const getProductsbyId = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await productModel.findById(id);
    console.log("products", product);

    if (!product) {
      return res.status(404).json({
        message: "product not found with this is",
        success: false,
      });
    }

    return res.status(200).json({
      message: "this user is found with this is",
      product,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "error during catch in find by user ud",
      error: err.message,
      success: false,
    });
  }
};

// GET ELEMENT BY ID AND UPDATE
export const getProductsByIdAndUpdate = async (req, res) => {
  try {
    //  fetching the product by it

    const id = req.params.id;

    const product = await productModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log("product=> will be the here!!", product);
    // in case if product is not found!
    if (!product) {
      return res.status(404).json({
        message: "no product found with this is id",
        success: false,
      });
    }
    // if product is found
    return res.status(200).json({
      message: "this product found with this id",
      product,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "server error in catch of find and update",
      success: false,
      error: err.message,
    });
  }
};

// Delete the itms by id
export const getProductByIdAndDelete = async (req, res) => {
  try {
    //  fetching the product by it

    const id = req.params.id;

    const product = await productModel.findByIdAndDelete(id);
    console.log("product=> will be the here!!", product);
    // in case if product is not found!
    if (!product) {
      return res.status(404).json({
        message: "no product found with this is id",
        success: false,
      });
    }
    // if product is found
    return res.status(200).json({
      message: "product deleted success fully",
      success: true,
    });
  } catch (err) {
    return res.status(400).json({
      message: "server error in catch of find and delete",
      success: false,
      error: err.message,
    });
  }
};

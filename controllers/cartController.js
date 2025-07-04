import mongoose from "mongoose";
import { cartModel } from "../models/cartModel.js";

// ADD TO CART
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity, price, tittle } = req.body;
    console.log("productId, quantity, price", productId, quantity, price);
    const userId = req.user;

    // to check any cart with this userId is present or not
    let cart = await cartModel.findOne({ userId });

    console.log("cartitms", cart);
    // if no cart is present with this userId than try to made new cart
    if (!cart) {
      cart = new cartModel({ userId, itms: [] });
    }
    const cartitmsIndex = cart.itms.findIndex(
      (itms) => itms.productId && itms.productId.toString() == productId
    );

    if (cartitmsIndex > -1) {
      (cart.itms[cartitmsIndex].quantity += quantity),
        (cart.itms[cartitmsIndex].price += price * quantity);
    } else {
      cart.itms.push({ productId, quantity, price, tittle });
    }

    await cart.save();
    return res.status(200).json({
      message: "itms are successfully added to the cart",
      cart,
      success: true,
    });

    // step:1 check that cart with that id is present or not!
  } catch (err) {
    return res.status(404).json({
      message: "error from catch in cartController",
      error: err.message,
    });
  }
};

// USER SPECIFIC CART
export const userSpecificCart = async (req, res) => {
  try {
    const userId = req.user;
    const cart = await cartModel.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        message: "not cart found",
      });
    }
    return res.status(200).json({
      message: "this cart is found bro",
      cart,
    });
  } catch (err) {
    return res.status(404).json({
      message: "message in catch of userSpecificCart",
      error: err.message,
    });
  }
};

// REMOVE PRODUCT BASE ON ID
export const remonveProductFromCart = async (req, res) => {
  try {
    const id = req.params.productId;
    const userId = req.user;
    // find the cart base on userId
    const cart = await cartModel.findOne({ userId });

    console.log("cart from removeProductFromCart", cart);

    if (!cart) {
      return res.status(404).json({
        message: "not any cart found",
        success: false,
      });
    }
    cart.itms = cart.itms.filter((itms) => {
      return itms.productId && itms.productId.toString() !== id;
    });
    cart.save();

    res.status(200).json({
      message: "product from the cart deleted success fully",
      success: true,
    });
  } catch (err) {
    res.status(404).json({
      message: "error in catch of remonveProductFromCart",
      error: err.message,
    });
  }
};

// CLEAR THE CART
export const clearCart = async (req, res) => {
  try {
    let userId = req.user;
    const cart = await cartModel.findOne({ userId });

    console.log("cart for remove", cart);
    if (!cart) {
      cart = new cartModel({ itms: [] });
    } else {
      cart.itms = [];
    }
    await cart.save();

    return res.status(200).json({
      message: "cart deleted successfully",
    });
  } catch (err) {
    return res.status(404).json({
      message: "this message is comming for deleting in cart",
      error: err.message,
    });
  }
};

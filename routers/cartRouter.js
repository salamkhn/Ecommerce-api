import express from "express";
import { isAunthaticated } from "../isauthenticated/auth.js";
import {
  addToCart,
  clearCart,
  remonveProductFromCart,
  userSpecificCart,
} from "../controllers/cartController.js";
export const cartRouter = express();

// making routing for the cart!

// add to cart
cartRouter.post("/add", isAunthaticated, addToCart);

// user specific cart
cartRouter.get("/usercart", isAunthaticated, userSpecificCart);

// Remove product from cart based on Id
cartRouter.delete(
  "/remove/:productId",
  isAunthaticated,
  remonveProductFromCart
);

// clear the cart
cartRouter.delete("/clearcart", isAunthaticated, clearCart);

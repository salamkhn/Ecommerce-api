import mongoose from "mongoose";

// CART-ITMS SCHEMA (MATLAB CART ITMS SCHEMA MA KYA KYA HU SAKATY HA)
const cartitmsSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "productModels",
  },
  tittle: {
    type: String,
    retuired: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
});


// CART_SCHEMA
const cartSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  itms: [cartitmsSchema],
});

// CREATING MODEL FOR THE CART SCHEMA!

export const cartModel = mongoose.model("cartitm", cartSchema);

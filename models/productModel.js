import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, default: 0 },
  },
  {
    strict: false,
    timestamps: true,
  }
);
export const productModel = mongoose.model("products", productSchema);

import express from "express";
import { config } from "dotenv";

const app = express();

import { dbCon } from "./db/dbCon.js";
import { userrouter } from "./routers/user.js";
import { productrouter } from "./routers/productRouter.js";
import { cartRouter } from "./routers/cartRouter.js";

dbCon();
config();

// middleware function
app.use(express.json());

// ROUTING PART________

// User Routing
app.use("/api/user", userrouter);

// Product Routing
app.use("/api/product", productrouter);

// cart routing
app.use("/api/cart", cartRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`hello i am listingng at port ${port}`);
});

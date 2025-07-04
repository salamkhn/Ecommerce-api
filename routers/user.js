import express from 'express'
import { LoginUser, RegisterUser } from '../controllers/user.js';


export const userrouter=express.Router();

// @api dsc:-user api
// method :- post;
// @end_poing :/api/user/


// @end_poing :/register
userrouter.post("/register",RegisterUser)


// @end_poing :/register
userrouter.post("/login",LoginUser)
import express from "express";
import { deleteUser } from "../controller/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";



const route = express.Router();

route.delete("/:id",verifyToken, deleteUser)


export default route;
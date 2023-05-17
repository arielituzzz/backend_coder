import { Router } from "express";
import authAdmin from "./middelwares/roles/authAdmin.js";
import authUser from "./middelwares/roles/authUser.js";
import {
  list,
  deleteOne,
  getOne,
  save,
  update,
} from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/", authUser, list);
userRouter.get("/:id", authUser, getOne);
userRouter.post("/", authAdmin, save);
userRouter.put("/:id", authAdmin, update);
userRouter.delete("/:id", authAdmin, deleteOne);

export default userRouter;

import { Router } from "express";
import auth from "./middelwares/auth.js";
import {
  list,
  deleteOne,
  getOne,
  save,
  update,
} from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/", list);
userRouter.get("/:id", getOne);
userRouter.post("/", auth, save);
userRouter.put("/:id", auth, update);
userRouter.delete("/:id", auth, deleteOne);

export default userRouter;

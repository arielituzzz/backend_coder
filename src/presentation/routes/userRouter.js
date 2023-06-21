import { Router } from "express";
// import authAdmin from "../middelwares/roles/authAdmin.js";
import authUser from "../middelwares/roles/authUser.js";
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
userRouter.post("/", authUser, save);
userRouter.put("/:id", authUser, update);
userRouter.delete("/:id", authUser, deleteOne);

export default userRouter;

import { Router } from "express";
import { editProfileInfo, getProfileInfo } from "../controllers/user/profile";

const userRouter = Router();
userRouter.post("/profile", getProfileInfo);
userRouter.post("/profile/edit", editProfileInfo);
export { userRouter };

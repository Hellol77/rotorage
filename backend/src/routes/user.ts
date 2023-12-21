import { Router } from "express";
import { getProfileInfo } from "../controllers/user/profile";

const userRouter = Router();
userRouter.post("/profile", getProfileInfo);

export { userRouter };

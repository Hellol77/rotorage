import { Router } from "express";
import { getProfileInfo } from "../controllers/user/getProfileInfo";
import { editProfileInfo } from "../controllers/user/editProfileInfo";
import { searchProfileInfo } from "../controllers/user/searchProfileInfo";

const userRouter = Router();
userRouter.post("/profile", getProfileInfo);
userRouter.post("/profile/edit", editProfileInfo);
userRouter.get("/profile/:userId", searchProfileInfo);
export { userRouter };

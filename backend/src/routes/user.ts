import { Router } from "express";
import awsUpload from "../../config/multerConfig";
import { getMyProfileInfo } from "../controllers/user/getMyProfileInfo";
import { editProfileInfo } from "../controllers/user/editProfileInfo";
import { searchProfileInfo } from "../controllers/user/searchProfileInfo";

const userRouter = Router();
userRouter.post("/profile", getMyProfileInfo);
userRouter.post("/profile/edit", awsUpload.single("profileImage"), editProfileInfo);
userRouter.get("/profile/:userId", searchProfileInfo);
export { userRouter };

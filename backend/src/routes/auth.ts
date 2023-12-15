import { getKakaoLogin, refreshKakaoAccessToken } from "../controllers/auth";
import { Router } from "express";

const authRouter = Router();
authRouter.get("/login/kakao", getKakaoLogin);
authRouter.post("/refresh/kakao", refreshKakaoAccessToken);
export { authRouter };

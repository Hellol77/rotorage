import { logoutKakao } from "./../controllers/auth";
import { getKakaoLogin, refreshKakaoAccessToken } from "../controllers/auth";
import { Router } from "express";

const kakaoAuthRouter = Router();

kakaoAuthRouter.get("/login", getKakaoLogin);
kakaoAuthRouter.post("/refresh", refreshKakaoAccessToken);
kakaoAuthRouter.post("/logout", logoutKakao);

export { kakaoAuthRouter };

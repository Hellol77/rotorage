import { Router } from "express";
import {
  getKakaoLogin,
  logoutKakao,
  refreshKakaoAccessToken,
  validateAccessToken,
} from "./../controllers/auth";

const kakaoAuthRouter = Router();

kakaoAuthRouter.get("/login", getKakaoLogin);
kakaoAuthRouter.post("/validate", validateAccessToken);
kakaoAuthRouter.post("/refresh", refreshKakaoAccessToken);
kakaoAuthRouter.post("/logout", logoutKakao);

export { kakaoAuthRouter };

import { getKakaoLogin } from "./../controllers/login";
import { Router } from "express";

const loginRouter = Router();
loginRouter.get("/kakao", getKakaoLogin);

export { loginRouter };

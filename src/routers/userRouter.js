import express from "express";
import {
  edit,
  logout,
  startGithubLogin,
  finishGithubLogin,
  startKakaoLogin,
  finishKakaoLogin,
  getEdit,
  postEdit,
  see,
  getChangePassword,
  postChangePassword,
} from "../controllers/userController";

import { protectorMiddleware, publicOnlyMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
userRouter
  .route("/change-password")
  .all(protectorMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);

userRouter.get("/logout", protectorMiddleware, logout);

userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
userRouter.get("/kakao/start", publicOnlyMiddleware, startKakaoLogin);
userRouter.get("/kakao/finish", publicOnlyMiddleware, finishKakaoLogin);

userRouter.get("/see", see);

export default userRouter;

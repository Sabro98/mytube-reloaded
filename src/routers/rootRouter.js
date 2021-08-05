import express from "express";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
} from "../controllers/userController";
import { home, search } from "../controllers/videoController";

const rootRounter = express.Router();

rootRounter.get("/", home);
rootRounter.route("/join").get(getJoin).post(postJoin);
rootRounter.route("/login").get(getLogin).post(postLogin);
rootRounter.get("/search", search);

export default rootRounter;

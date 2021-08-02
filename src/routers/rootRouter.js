import express from "express";
import { getJoin, postJoin, login } from "../controllers/userController";
import { home, search } from "../controllers/videoController";

const rootRounter = express.Router();

rootRounter.get("/", home);
rootRounter.route("/join").get(getJoin).post(postJoin);
rootRounter.get("/login", login);
rootRounter.get("/search", search);

export default rootRounter;

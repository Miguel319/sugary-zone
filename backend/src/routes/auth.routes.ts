import { Router } from "express";
import { signup, signin } from "../controllers/auth";

const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);

export default authRouter;

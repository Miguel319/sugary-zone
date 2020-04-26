import { Router } from "express";
import { signup, signin } from "../controllers/auth";

const authRouter = Router();

authRouter.post("/signup", signup as any);
authRouter.post("/signin", signin as any);

export default authRouter;

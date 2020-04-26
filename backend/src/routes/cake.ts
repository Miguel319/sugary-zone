import express from "express";
const { Router } = express;
const cakeRouter = Router();

import {
  createCake,
  getCake,
  getCakes,
  updateCake,
  deleteCake,
} from "../controllers/cake";

cakeRouter
  .route("")
  .get(getCakes as any)
  .post(createCake as any);

cakeRouter
  .route("/:id")
  .get(getCake as any)
  .put(updateCake as any)
  .delete(deleteCake as any);

export default cakeRouter;

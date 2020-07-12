import express from "express";

import {
  createCake,
  getCake,
  getCakes,
  updateCake,
  deleteCake,
} from "../controllers/cake";

const cakeRouter = express.Router();

cakeRouter.route("/").get(getCakes).post(createCake);

cakeRouter.route("/:id").get(getCake).put(updateCake).delete(deleteCake);

export default cakeRouter;

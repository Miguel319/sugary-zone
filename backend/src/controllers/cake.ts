import Cake from "../models/cake";
import asyncHandler from "../middlewares/asyncHandler";
import { Request, Response, NextFunction } from "express";
import User from "../models/user";

export const createCake = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "You must provide a user id.",
      });
    }

    const { title, prepTime, directions, ingredients, imgUrl } = req.body;

    const cake = await Cake.create({
      title,
      prepTime,
      ingredients,
      directions,
      imgUrl,
      user: id,
    });

    await cake.save();

    const user: any = await User.findById(id);
    user.cakes.push(cake);

    await user.save();

    res.status(201).json({
      message: "Cake recipe created successfully!",
    });
  }
);

export const getCakes = asyncHandler(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    const cakes = await Cake.find({});
    res.status(200).json({ cakes });
  }
);

export const getCake = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const cakeFromId = await Cake.findOne({ _id: id });

  res.status(200).json(cakeFromId);
});

export const updateCake = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, prepTime, directions, ingredients, imgUrl } = req.body;
    const { id } = req.params;

    await Cake.updateOne(
      { _id: id },
      {
        title,
        prepTime,
        directions,
        ingredients,
        imgUrl,
      }
    );

    res.status(200).json({
      message: "Cake recipe updated successfully!",
    });
  }
);

export const deleteCake = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    await Cake.findOneAndDelete({ _id: id });

    res.status(200).json({
      message: "Cake recipe deleted successfully!",
    });
  }
);

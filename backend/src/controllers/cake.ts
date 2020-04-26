import Cake from "../models/cake";
import asyncHandler from "../middlewares/asyncHandler";
import { Request, Response } from 'express';

export const createCake = asyncHandler(
  async (req: Request, res: Response, next: any) => {
    const { title, prepTime, directions, ingredients, imgUrl } = req.body;

    await new Cake({
      title,
      prepTime,
      ingredients,
      directions,
      imgUrl
    }).save();

    res.status(201).json({
      message: "Cake recipe created successfully!"
    });
  }
);

export const getCakes = asyncHandler(
  async (req: Request, res: Response, next: any) => {
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
  async (req: Request, res: Response, next: any) => {
    const { title, prepTime, directions, ingredients, imgUrl } = req.body;
    const { id } = req.params;

    await Cake.updateOne(
      { _id: id },
      {
        title,
        prepTime,
        directions,
        ingredients,
        imgUrl
      }
    );

    res.status(200).json({
      message: "Cake recipe updated successfully!"
    });
  }
);

export const deleteCake = asyncHandler(
  async (req: Request, res: Response, next: any) => {
    const { id } = req.params;

    await Cake.findOneAndDelete({ _id: id });

    res.status(200).json({
      message: "Cake recipe deleted successfully!"
    });
  }
);

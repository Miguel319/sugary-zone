import Cake from "../models/cake";
import asyncHandler from "../middlewares/asyncHandler";
import ErrorResponse from "../helpers/errorResponse";

exports.createCake = asyncHandler(
  async (req: Request, res: Response, next: any) => {
    // @ts-ignore
    const { title, prepTime, directions, ingredients, imgUrl } = req.body;

    await new Cake({
      title,
      prepTime,
      ingredients,
      directions,
      imgUrl
    }).save();

    // @ts-ignore
    res.status(201).json({
      message: "Cake recipe created successfully!"
    });
  }
);

exports.getCakes = asyncHandler(
  async (req: Request, res: Response, next: any) => {
    const cakes = await Cake.find({});
    // @ts-ignore
    res.status(200).json({ cakes });
  }
);

exports.getCake = asyncHandler(async (req: Request, res: Response) => {
  // @ts-ignore
  const { id } = req.params;
  const cakeFromId = await Cake.findOne({ _id: id });

  // @ts-ignore
  res.status(200).json(cakeFromId);
});

exports.updateCake = asyncHandler(
  async (req: Request, res: Response, next: any) => {
    // @ts-ignore
    const { title, prepTime, directions, ingredients, imgUrl } = req.body;
    const { id } = req["params"];

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

    // @ts-ignore
    res.status(200).json({
      message: "Cake recipe updated successfully!"
    });
  }
);

exports.deleteCake = asyncHandler(
  async (req: Request, res: Response, next: any) => {
    // @ts-ignore
    const { id } = req["params"];

    await Cake.findOneAndDelete({ _id: id });

    // @ts-ignore
    res.status(200).json({
      message: "Cake recipe deleted successfully!"
    });
  }
);

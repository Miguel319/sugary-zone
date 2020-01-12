// const Cake = require("../models/cake");
import Cake from "../models/cake";

exports.createCake = async (req: Request, res: Response) => {
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
};

exports.getCakes = async (req: Request, res: Response) => {
  const cakes = await Cake.find({});
  // @ts-ignore
  res.status(200).json({ cakes });
};

exports.getCake = async (req: Request, res: Response) => {
  // @ts-ignore
  const { id } = req.params;
  const cakeFromId = await Cake.findOne({ _id: id });

  // @ts-ignore
  res.status(200).json(cakeFromId);
};

exports.updateCake = async (req: Request, res: Response) => {
  // @ts-ignore
  const { title, prepTime, directions, ingredients, imgUrl } = req.body;
  const { id } = req["params"];

  console.log(id)

  await Cake.findOneAndUpdate(
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
};

exports.deleteCake = async (req: Request, res: Response) => {
  // @ts-ignore
  const { title, prepTime, directions, ingredients, imgUrl } = req.body;
  const { id } = req["params"];

  await Cake.findOneAndDelete({ _id: id });

  // @ts-ignore
  res.status(200).json({
    message: "Cake recipe deleted successfully!"
  });
};

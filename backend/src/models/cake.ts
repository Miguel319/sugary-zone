// import { Schema, model } from "mongoose";
import mongoose from "mongoose";

// @ts-ignore
const CakeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "The title is mandatory."],
      unique: true
    },
    prepTime: {
      type: String,
      required: [true, "The time it takes to prepare the cake is mandatory."]
    },
    ingredients: [
      {
        quantity: {
          type: String,
          required: [true, "You must specify the ingredient's type."]
        },
        name: {
          type: String,
          required: [true, "You must specify the ingredient' name."]
        }
      }
    ],
    directions: {
      type: String,
      required: [true, "The directions field is mandatory."]
    },
    imgUrl: String
  },
  {
    timestamps: true
  }
);

const Cake = mongoose.model("Cake", CakeSchema);

export default Cake;

import Ingredient from "./ingredient";

export default interface Recipe {
    _id?: string;
    title: string;
    prepTime: string;
    ingredients: Ingredient[] | undefined;
    directions: string;
    imgUrl?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

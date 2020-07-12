import React, {
  FC,
  FormEvent,
  CSSProperties,
  useState,
  ChangeEvent,
} from "react";
import Recipe from "../../models/recipe";
import Ingredient from "../../models/ingredient";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Toast } from "../../utils/toast";

const INITIAL_RECIPE: Recipe = {
  title: "",
  prepTime: "",
  ingredients: [],
  directions: "",
  imgUrl: "",
};

const INITIAL_INGREDIENT: Ingredient = {
  quantity: "",
  name: "",
};

const RecipeCreate: FC = () => {
  const [recipe, setRecipe] = React.useState<Recipe>(INITIAL_RECIPE);
  const [ingredient, setIngredient] = useState<Ingredient>(INITIAL_INGREDIENT);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [ingredientDisabled, setIngredientDisabled] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState(false);

  React.useEffect(() => {
    const isIngredientFormValid = Object.values(ingredient).every((v: any) =>
      Boolean(v)
    );

    setIngredientDisabled(!isIngredientFormValid);
  }, [ingredient]);

  const handleIngredientSubmit = (event: any) => {
    event.preventDefault();

    setIngredients((prevIngredient) => [...prevIngredient, ingredient]);
    setIngredient(INITIAL_INGREDIENT);
  };

  const handleRecipeSubmit = async (
    event: ChangeEvent<HTMLFormElement>
  ): Promise<any> => {
    event.preventDefault();

    // recipe.ingredients = ingredients;

    setRecipe((prev: any) => ({
      ...prev,
      ingredients,
    }));

    try {
      const url = "http://localhost:3001/api/cakes";

      await axios.post(url, recipe);

      Toast.fire({
        icon: "success",
        title: "Recipe created successfully!",
      });

      setTimeout(() => setSuccess(true), 3000);
    } catch (error) {
      setError(true);
      console.error(error);
    }
  };

  const handleIngredientChange = (event: any) => {
    const { name, value } = event.target;

    setIngredient((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleRecipeChange = (event: any) => {
    const { name, value } = event.target;

    setRecipe((prevState) => ({ ...prevState, [name]: value }));
  };

  const addBtnStyles: CSSProperties = {
    borderRadius: "13px",
    padding: "20px ",
  };

  const titleStyles: CSSProperties = {
    width: "50%",
    margin: "auto",
    marginBottom: "15px",
  };

  const fasStyles: CSSProperties = {
    marginRight: "7px",
  };

  const ingredientStyles: CSSProperties = {
    marginTop: "10px",
  };

  const recipeStyles: CSSProperties = {
    width: "100%",
    marginLeft: "auto",
  };

  return (
    <div className="mt-3 container">
      <div className="row ">
        {success && <Redirect to="/"></Redirect>}
        <div style={ingredientStyles} className="col-sm-5">
          <h5 style={titleStyles}>Ingredients</h5>

          <form onSubmit={handleIngredientSubmit}>
            <div className="form-row">
              <div className="col-sm-6 form-group">
                <label htmlFor="ingredient">Ingredient</label>
                <input
                  placeholder="Ingredient's name"
                  name="name"
                  value={ingredient.name}
                  className="form-control"
                  onChange={handleIngredientChange}
                />
              </div>
              <div className="col-sm-4 form-group">
                <label htmlFor="quantity">Quantity</label>
                <input
                  placeholder="Quantity"
                  value={ingredient.quantity}
                  name="quantity"
                  className="form-control"
                  onChange={handleIngredientChange}
                />
              </div>
              <button
                style={addBtnStyles}
                disabled={ingredientDisabled}
                className="btn btn-success"
                type="submit"
              >
                <i className="fas fa-plus"></i>
              </button>
            </div>
          </form>

          <ul className="mt-5">
            {ingredients.map((v, i) => (
              <li key={i}>{`${v.name} - ${v.quantity}`}</li>
            ))}
          </ul>
        </div>
        <div style={recipeStyles} className="col-sm-6">
          <h4 style={titleStyles}>Recipe</h4>

          <form onSubmit={handleRecipeSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                placeholder="Title"
                name="title"
                value={recipe.title}
                className="form-control"
                onChange={handleRecipeChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="directions">Directions</label>
              <textarea
                placeholder="Directions"
                value={recipe.directions}
                name="directions"
                className="form-control"
                onChange={handleRecipeChange}
                rows={4}
              />
            </div>
            <div className="form-group">
              <label htmlFor="imgUrl">Img URL</label>
              <input
                placeholder="Image URL Path"
                value={recipe.imgUrl}
                name="imgUrl"
                className="form-control"
                onChange={handleRecipeChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="prepTime">Prep Time</label>
              <input
                placeholder="Estimated prep time"
                value={recipe.prepTime}
                name="prepTime"
                className="form-control"
                onChange={handleRecipeChange}
              />
            </div>
            <button type="submit" className="btn btn-success btn-block">
              <i style={fasStyles} className="fas fa-database"></i>Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RecipeCreate;

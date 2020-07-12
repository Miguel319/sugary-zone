import React, { FC } from "react";
import "./recipe.css";
import Recipe from "../../models/recipe";

interface RecipeCProps {
  recipe: Recipe;
}

const RecipeC: FC<RecipeCProps> = ({ recipe }) => (
  <>
    <div className="recipe-c">
      <div className="card">
        <div className="card-image"></div>
        <div className="card-text">
          <span>{recipe.createdAt}</span>
          <h2>{recipe.title}</h2>
          <p>{recipe.directions}</p>
        </div>
        <div className="card-facts">
          <div className="fact">
            <div className="value">{recipe.prepTime}</div>
            <div className="prep-time">Prep time</div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default RecipeC;

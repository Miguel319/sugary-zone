import React, { Component, FC, useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import MainImage from "../MainImage/MainImage";
import RecipeC from "./RecipeC";
import Recipe from "../../models/recipe";

interface RecipeListState {
  recipes: Array<Recipe>;
}

const RecipeList: FC = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {

    const fetchRecipes = async () => {
      const {
        data: { cakes },
      } = await axios.get(`${baseUrl}/cakes`);
      console.log(cakes);
      setRecipes(cakes);
    };
  
    fetchRecipes();

  }, []);


  return (
    <div>
      <MainImage />
      <div className="mt-2 container">
        <h2>Recipe List</h2>
        {recipes.map((recipe: Recipe) => (
          <RecipeC recipe={recipe} key={recipe._id}></RecipeC>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;

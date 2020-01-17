import React, { Component } from "react";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";

export default class RecipeCreate extends Component {
    
    state = {
        recipes: []
    }
    
    
  async componentDidMount() {}

  // @ts-ignore
  render() {
      return (
        <div className="row">
            <div className="col-md-4">

            </div>

            <div className="col-md-8">
                {
  this.state.recipes.map(recipe => <li>{recipe['title']}</li>)
                }
            </div>
        </div>
      );
  }
}

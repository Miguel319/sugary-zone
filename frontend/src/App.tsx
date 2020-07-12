import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import RecipeList from "./components/Recipe/RecipeList";
import RecipeCreate from "./components/Recipe/RecipeCreate";
import styles from './App.module.css'
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

const App: React.FC = () => {

  return (
    <>
      <Router>
        <Navbar />
        <div className={styles["main-container"]}>
          <Route path="/" exact component={RecipeList} />
          <Route path="/create" component={RecipeCreate} />
          <Route path="/edit/:id" component={RecipeCreate} />
          <Route path="/signin" component={Login} />
          <Route path="/signup" component={Register} />
        </div>
      </Router>
    </>
  );
};

export default App;

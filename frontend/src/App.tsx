import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route} from 'react-router-dom';

import Navbar from "./components/Navbar/Navbar";
import RecipeList from "./components/Recipe/RecipeList";
import RecipeCreate from "./components/Recipe/RecipeCreate";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Navbar />

        <Route path="/" exact component={RecipeList} />
        <Route path="/create" component={RecipeCreate} />
        <Route path="/edit/:id" component={RecipeCreate} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Router>
    </>
  );
};

export default App;

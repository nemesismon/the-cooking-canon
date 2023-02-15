import { Routes, Route } from "react-router-dom"
import './App.css';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import Recipe from "./Components/Recipe/Recipe";
import RecipeForm from "./Components/Recipe/RecipeForm";
import Source from "./Components/Source/Source";
import SourceForm from "./Components/Source/SourceForm";
import { useEffect } from "react";

function App() {

  

  return (
    <div className="App">
      <header className="App-header">
        <>The Cooking Canon</>
      </header>
      <div>
        <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipe_list" element={<Recipe />} />
            <Route path="/recipe_form" element={<RecipeForm />} />
            <Route path="/source" element={<Source />} />
            <Route path="/source_form" element={<SourceForm />} />
          </Routes>
      </div>
    </div>
  );
}

export default App;

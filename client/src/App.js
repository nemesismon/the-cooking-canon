import { Routes, Route } from 'react-router-dom'
import { useState } from 'react';
import './App.css';
import NavBar from './Components/NavBar';
import Login from './Components/Login'
import Home from './Components/Home';
import Recipe from './Components/Recipe/Recipe';
import RecipeForm from './Components/Recipe/RecipeForm';
import FullRecipe from './Components/Recipe/FullRecipe';
import Source from './Components/Source/Source';
import SourceForm from './Components/Source/SourceForm';
import { useDispatch } from 'react-redux';
import { fetchUser } from './Components/User/userSlice';
// import logo from '/Components/TCCHorizLogo.png'


function App() {

  const [fetchRun, setFetchRun] = useState(false)

  const dispatch = useDispatch()

  if (fetchRun === false) {
    dispatch(fetchUser()).unwrap()
    setFetchRun(true)
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <>The Cooking Canon</>
        {/* {logo} */}
      </header>
      <div>
        <NavBar />
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/recipe_list' element={<Recipe />} />
            <Route path='/recipe_form' element={<RecipeForm />} />
            <Route path='/source' element={<Source />} />
            <Route path='/source_form' element={<SourceForm />} />
            <Route path='/full_recipe' element={<FullRecipe />} />
            <Route path='/' element={<Home />} />
          </Routes>
      </div>
    </div>
  );
}

export default App;

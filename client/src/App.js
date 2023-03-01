import { Routes, Route, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import './App.css';
import NavBar from './Components/NavBar';
import NavBarOut from './Components/NavBarOut.js';
import Login from './Components/Login'
import Home from './Components/Home';
import Recipes from './Components/Recipe/Recipes';
import NewRecipe from './Components/Recipe/NewRecipe';
import RecipeDetails from './Components/Recipe/RecipeDetails';
import Sources from './Components/Source/Sources';
import NewSource from './Components/Source/NewSource';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from './Components/User/userSlice';
import Logo from './Images/the-cooking-canon-logo.png'

function App() {

  const [fetchRun, setFetchRun] = useState(false)
  const [login, setLogin] = useState(false)

  const dispatch = useDispatch()
  const loginStatus = useSelector(state => state.user.loginStatus)

  console.log(loginStatus)

  if (fetchRun === false) {
    dispatch(fetchUser()).unwrap()
    setFetchRun(true)
  }

  const navBarToggle = loginStatus ? <NavBar /> : <NavBarOut setLogin={setLogin}/>

  return (
    <div className='App'>
      <header className='App-header'>
        <img height='100px' src={Logo}/>
      </header>
      <div>
        {navBarToggle}
          <Routes>
            <Route path='/login' element={<Login login={login} setLogin={setLogin}/>} />
            <Route path='/recipes/new' element={<NewRecipe />} />
            <Route path='/recipes' element={<Recipes />} />
            <Route path='/sources' element={<Sources />} />
            <Route path='/sources/new' element={<NewSource />} /> 
            <Route path='/recipe_details' element={<RecipeDetails />} />
            <Route path='/' element={<Home />} />
          </Routes>
      </div>
    </div>
  );
}

export default App;

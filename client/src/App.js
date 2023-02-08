import './App.css';
import User from './Components/User/User'
import NavBar from './Components/NavBar';
import Home from './Components/Home';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <>The Cooking Canon</>
        <NavBar />
      </header>
      <body>
        <Home />
        <User />
      </body>
    </div>
  );
}

export default App;

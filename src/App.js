import logo from './logo.svg';
import './App.css';
import Home from './pages/home';
import Login from './pages/login';
import './styles/main.css';
import {Routes, Route} from 'react-router-dom';
import {Link, useLocation} from 'react-router-dom';

function App() {
  let location = useLocation();

  return (
    <div className="App">
      <div className='topnav'>
        <Link to='/' className={(location.pathname == '/')? "active" : ""}>Accueil</Link>
        <Link to='/login' className={(location.pathname == '/login')? "active" : ""}>Connexion</Link>
      </div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;

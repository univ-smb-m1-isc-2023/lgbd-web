import logo from './logo.svg';
import './App.css';
import Home from './pages/home';
import Login from './pages/login';
import Account from './pages/account';
import CreateAcc from './pages/createacc';
import Users from './pages/users';
import UserSettings from './pages/usersettings';
import ScrappingLaunch from './pages/scrappinglaunch';
import Search from './pages/search';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import './styles/main.css';
import Bd from './pages/bd';
import {Routes, Route, Link, useLocation, useNavigate} from 'react-router-dom';
import React, {useState, createContext, useContext} from 'react';

export const AuthContext = createContext();

function App() {
  let location = useLocation();
  let navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [user, setUser] = useState({});

  const logout = (event) => {
    setIsLoggedIn(false);
    setUsername('');
    setUser({});
  }

  return (
    <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn, username, setUsername, user, setUser}}>
      <div className="App">
        <div className='topnav'>
          <div>
            <Link to='/' className={(location.pathname == '/')? "active" : ""}>Accueil</Link>
            <Link to='/search' className={(location.pathname == '/search')? "active" : ""}>Recherche</Link>
            <Link to='/account' className={(location.pathname == '/account')? "active" : ""}>Compte</Link>
            {isLoggedIn && user.admin &&<Link to='/users' className={(location.pathname == '/users')? "active" : ""}>Utilisateurs</Link>}
            {isLoggedIn && user.admin && <Link to='/scrapping' className={(location.pathname == '/scrapping')? "active" : ""}>Scrapping</Link>}
          </div>
          <div>
            {isLoggedIn ? (
              <>
                <span className='welcomeMessage'>Bonjour, {username}</span>
                <Link to="/" onClick={logout} className={`nav-link-right ${(location.pathname == '/logout')? "active" : ""}`}>Déconnexion</Link>
              </>
              
            ) : (
              <>
                <Link to='/createacc' className={`nav-link-right ${(location.pathname == '/createacc')? "active" : ""}`}>S'inscrire</Link>
                <Link to='/login' className={`nav-link-right ${(location.pathname == '/login')? "active" : ""}`}>S'identifier</Link>
              </>
            )}
          </div>
        </div>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/account' element={<PrivateRoute><Account/></PrivateRoute>}/>
          <Route path='/usersettings' element={<PrivateRoute><UserSettings/></PrivateRoute>}/>
          <Route path='/scrapping' element={<ScrappingLaunch/>}/>
          <Route path='/search' element={<Search/>}/>
          <Route path='/createacc' element={<CreateAcc/>}/>
          <Route path='/users' element={<Users/>}/>
          <Route path='/bd' element={<Bd/>}/>
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;

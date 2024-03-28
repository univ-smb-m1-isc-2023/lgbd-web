import logo from './logo.svg';
import './App.css';
import Home from './pages/home';
import Login from './pages/login';
import Account from './pages/account';
import CreateAcc from './pages/createacc';
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
        <Link to='/account' className={(location.pathname == '/account')? "active" : ""}>Compte</Link>
        <Link to='/createacc' className={(location.pathname == '/createacc')? "active" : ""}>Créer un compte</Link>
      </div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/account' element={<Account/>}/>
        <Route path='/createacc' element={<CreateAcc/>}/>
      </Routes>
    </div>
  );
}

export default App;

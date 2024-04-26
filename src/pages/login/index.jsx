import {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../App';
import './login.css';

function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {setIsLoggedIn} = useContext(AuthContext);
    const {setUsername} = useContext(AuthContext);
    const {setUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            const res = await fetch('https://api-lgbd.oups.net/checklogin', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({email, password})
            });

            if(res.ok){
                console.log('Connexion réussie');
                const data = await res.json();
                setIsLoggedIn(true);
                setUsername(data.name);
                setUser(data);
                navigate("/");
            }else{
                throw new Error('Erreur lors de la connexion');
            }
        }catch(err){
            console.error(err);
        }
    }

    return (
        <>
            <div className="login"> 
                <h1>Entrez dans votre univers dessiné</h1>
                <form className="loginForm" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required onChange={e => {setEmail(e.target.value)}}/>
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" id="password" name="password" required onChange={e=> (setPassword(e.target.value))}/>
                    <button type="submit">Connexion</button>
                </form>
            </div>
            <div className="redirect">
                <p>Nouveau sur LGBD ? <Link to="/createacc">Créer un compte</Link></p>
                
            </div>
        </>
        
    )
}
export default Login;
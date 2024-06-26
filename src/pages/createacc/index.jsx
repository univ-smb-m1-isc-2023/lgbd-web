import {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../App';
import './createacc.css';

function CreateAcc(){
    const [username, setUsernameC] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [admin, setAdmin] = useState(false); // [TODO] : add admin checkbox in form
    const [showAdminOption, setShowAdminOption] = useState(false); // [TODO] : add admin checkbox in form
    const [error, setError] = useState('');
    const {setIsLoggedIn} = useContext(AuthContext);
    const {setUsername} = useContext(AuthContext);
    const {setUser} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyDown = (event) => {
            if(event.ctrlKey && event.shiftKey && event.key === 'K'){
                setShowAdminOption(prevShowAdminOption => !prevShowAdminOption);
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, []);

    const createAccount = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword){
            setError('Les mots de passe ne correspondent pas');
            return;
        }

        console.log(admin);

        const response = await fetch('https://api-lgbd.oups.net/addUser', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({name : username, email, password, admin})
        });

        if (!response.ok){
            throw new Error('Erreur lors de la création du compte');
        }

        const loginResponse = await fetch("https://api-lgbd.oups.net/checklogin", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({email, password})
        });
        
        if (!loginResponse.ok){
            throw new Error('Erreur lors de la connexion');
        }else{
            const data = await loginResponse.json();
            setIsLoggedIn(true);
            setUsername(data.name);
            setUser(data);
            navigate("/");
        }
    }

    return (
        <>
            <div className="createacc">
                <h1>Découvrez votre passion pour les BD</h1>
                {error && <p>{error}</p>}
                <form className="createaccForm" onSubmit={createAccount}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required onChange={e=> setEmail(e.target.value)}/>
                    <label htmlFor="username">Nom d'utilisateur</label>
                    <input type="text" id="username" name="username" required onChange={e => setUsernameC(e.target.value)}/>
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" id="password" name="password" required onChange={e => setPassword(e.target.value)}/>
                    <label htmlFor="password">Confirmer le mot de passe</label>
                    <input type="password" id="password" name="password" required onChange={e => setConfirmPassword(e.target.value)}/>
                    {showAdminOption && (
                        <div>
                            <label htmlFor="admin">
                                Admin :
                                <input type="checkbox" checked={admin} id="admin" name="admin" onChange={e => setAdmin(e.target.checked)}/>
                            </label>
                        </div>
                    )}
                    <button type="submit">Créer le compte</button>
                </form>
            </div>
            <div className="redirect">
                <p>Déjà inscrit ? <Link to="/login">S'identifier</Link></p>
            </div>
        </>
    )
}
export default CreateAcc;
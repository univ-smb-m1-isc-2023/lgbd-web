import {useState} from 'react';
import { Link } from 'react-router-dom';
import './createacc.css';

function CreateAcc(){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const createAccount = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword){
            setError('Les mots de passe ne correspondent pas');
            return;
        }

        console.log("Username", username);
        console.log("Email", email);
        console.log("Password", password);
        console.log("Confirm Password", confirmPassword);

        const response = await fetch('https://api-lgbd.oups.net/addUser', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({name : username, email, password})
        });

        console.log(response);

        if (!response.ok){
            throw new Error('Erreur lors de la création du compte');
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
                    <input type="text" id="username" name="username" required onChange={e => setUsername(e.target.value)}/>
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" id="password" name="password" required onChange={e => setPassword(e.target.value)}/>
                    <label htmlFor="password">Confirmer le mot de passe</label>
                    <input type="password" id="password" name="password" required onChange={e => setConfirmPassword(e.target.value)}/>
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
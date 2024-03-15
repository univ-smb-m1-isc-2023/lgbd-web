import {useState} from 'react';

function Login(){
    return (
        <>
            <div className="login"> 
                <h1>Connexion</h1>
                <form className="loginForm">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required/>
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" id="password" name="password" required/>
                    <button type="submit">Connexion</button>
                </form>
            </div>
        </>
        
    )
}
export default Login;
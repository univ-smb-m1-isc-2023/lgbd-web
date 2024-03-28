import {useState} from 'react';
import './createacc.css';

function CreateAcc(){

    return (
        <>
            <div className="createacc">
                <h1>Création de compte</h1>
                <form className="createaccForm">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required/>
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" id="password" name="password" required/>
                    <label htmlFor="password">Confirmer le mot de passe</label>
                    <input type="password" id="password" name="password" required/>
                    <button type="submit">Créer le compte</button>
                </form>
            </div>
        </>
    )
}
export default CreateAcc;
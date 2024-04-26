import React, { useEffect, useState } from 'react';
import './style.css';
function Bd(){
    const [bd, setBd] = useState([]);
    const queryParameters = new URLSearchParams(window.location.search)
    const isbn = queryParameters.get("isbn")

    useEffect(() => {
        getBd();
    }, []);

    const getBd = async () => {
        const response = await fetch('https://api-lgbd.oups.net/bd/get?isbn='+isbn, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            },
        });
        setBd(await response.json());
    }
    
    return (
        <>
            <div className="bd">
                {bd == undefined ? (
                    <p>Chargement...</p>
                ) : (
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <h1>{bd.titre}</h1>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <img src={bd.image} alt={bd.titre} style={{marginRight: '20px'}}/>
                            <div>
                                <p>{bd.resume}</p>
                                <p>Editeur : {bd.editeur}</p>
                                <p>Sortie : {bd.annee}</p>
                                {bd.auteur != undefined ? (
                                <p>Auteur : {bd.auteur.nom} {bd.auteur.prenom}</p>) : (
                                <p>Auteur : Inconnu</p>)}
                                
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Bd;
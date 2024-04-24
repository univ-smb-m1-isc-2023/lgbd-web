import {useState} from 'react';

async function Bd(){
    const queryParameters = new URLSearchParams(window.location.search)
    const isbn = queryParameters.get("isbn")
    if(isbn === undefined){
        return (
            <>
                <p>Lien corrompu, isbn non indiqué</p>
            </>
        )
    }
    const response = await fetch('https://api-lgbd.oups.net/bd/get?isbn='+isbn, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
        });
    if(!response.ok){
        return (
            <>
                <p>Erreur lors de la récupération de la BD</p>
            </>
        )
    }
    const bd = await response.json();
    console.log(bd);
    return (
        <>
            <div className="bd">
                <h1>{bd.title}</h1>
                <p>ISBN : {bd.isbn}</p>
                <p>Titre : {bd.titre}</p>
                <p>Editeur : {bd.editeur}</p>
                <p>Annee : {bd.annee}</p>
            </div>
        </>
    )

}

export default Bd;
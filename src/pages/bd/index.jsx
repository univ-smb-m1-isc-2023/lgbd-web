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
                    <div className="bd-content">
                        <h1 className="bd-title">{bd.titre || 'Titre inconnu'}</h1>
                        <div className="bd-images">
                            {bd.images && bd.images.length > 0 ? (
                                bd.images.map((image, index) => (
                                    <img key={index} src={image} alt={`bd image ${index}`} />
                                ))
                            ) : (
                                <p>Images inconnues</p>
                            )}
                        </div>
                        <div className="bd-info">
                            <p><strong>Editeur:</strong> {bd.editeur || 'Editeur inconnu'}</p>
                            <p><strong>Sortie:</strong> {bd.annee || 'Année inconnue'}</p>
                            <p>
                                <strong>Auteur:</strong> {bd.auteur ? `${bd.auteur.nom}` : 'Auteur inconnu'}
                                {bd.auteur && <button className="follow-author">Follow Author</button>}
                            </p>
                            <p>
                                <strong>Serie:</strong> {bd.serie || 'Serie inconnue'}
                                {bd.serie && <button className="follow-series">Follow Series</button>}
                            </p>
                            <p><strong>Note:</strong> {bd.note || 'Note inconnue'}</p>
                            <p><strong>ISBN:</strong> {bd.isbn || 'ISBN inconnu'}</p>
                            <button className="like-bd">Like BD</button>
                        </div>
                        <div className="bd-resume">
                            <p>{bd.resume || 'Résumé inconnu'}</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Bd;
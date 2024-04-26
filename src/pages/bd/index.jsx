import React, { useEffect, useState } from 'react';
import { AuthContext } from '../../App';
import { useContext } from 'react';
import './bd.css';
function Bd(){
    const [bd, setBd] = useState([]);
    const {isLoggedIn} = useContext(AuthContext);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);


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
    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bd.image.length);
    };
    
    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + bd.image.length) % bd.image.length);
    };
    
    return (
        <>
            <div className="bd">
                {bd == undefined ? (
                    <p>Chargement...</p>
                ) : (
                    <div className="bd-content">
                        <h1 className="bd-title">{bd.titre || 'Titre inconnu'}</h1>
                        <div className="bd-images">
                        {bd.image && bd.image.length > 0 ? (
                        <>
                            <button onClick={prevImage}>Previous</button>
                            <img src={bd.image[currentImageIndex]} alt={`bd image ${currentImageIndex}`} />
                            <button onClick={nextImage}>Next</button>
                        </>
                            ) : (
                                <p>Images inconnues</p>
                            )}
                        </div>
                        <div className="bd-info">
                            <p><strong>Editeur:</strong> {bd.editeur || 'Editeur inconnu'}</p>
                            <p><strong>Sortie:</strong> {bd.annee || 'Année inconnue'}</p>
                            <p>
                                <strong>Auteur:</strong> {bd.auteur ? `${bd.auteur.nom}` : 'Auteur inconnu'}
                                {isLoggedIn && bd.auteur && <button className="follow-author">Follow Author</button>}
                            </p>
                            <p>
                                <strong>Serie:</strong> {bd.serie || 'Serie inconnue'}
                                {isLoggedIn && bd.serie && <button className="follow-series">Follow Series</button>}
                            </p>
                            <p><strong>Note:</strong> {bd.note || 'Note inconnue'}</p>
                            <p><strong>ISBN:</strong> {bd.isbn || 'ISBN inconnu'}</p>
                            {isLoggedIn && <button className="like-bd">Like BD</button>}
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
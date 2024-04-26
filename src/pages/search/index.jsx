import './search.css'
import {useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from '../../App';

function Search(){
    const {user} = useContext(AuthContext);
    const [serie, setSerie] = useState('');
    const [auteur, setAuteur] = useState('');
    const [titre, setTitre] = useState('');
    const [isbn, setIsbn] = useState('');
    const [bd, setBD] = useState([]);
    const [showBDSearchForm, setShowBDSearchForm] = useState(false);
    const [serieList, setSerieList] = useState([]);

    const getBD = async () => {
        const response = await fetch('https://api-lgbd.oups.net/bd/all', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            }
        });
        const data = await response.json();
        setBD(data);
        console.log(bd);
    }

    const getSerie = async () => {
        const response = await fetch('https://api-lgbd.oups.net/serie/all', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            }
        });
        const data = await response.json();
        setSerieList(data);
        console.log(serieList);
    }

    const handleLike = async (isbn) => {
        const response = await fetch('https://api-lgbd.oups.net/addLikeBd?isbn='+isbn+'&userId='+user.id, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            }
        });
        const data = await response.json();
        console.log(data);
    }

    const clearFields = () => {
        setSerie('');
        setAuteur('');
        setTitre('');
        setIsbn('');
    }

    useEffect(() => {
        getBD();
        getSerie();
    }, []);

    return (
        <div className='searchContainer'>
            <button onClick={() => setShowBDSearchForm(!showBDSearchForm)} className="changeSearch">{showBDSearchForm ? 'Chercher une BD' : 'Chercher une série'}</button>
            {!showBDSearchForm ? (
                <>
                    <h1>Cherchez une BD</h1>
                    <div className="searchForm">
                        <div className="line">
                            <label htmlFor="searchSerie">Série : </label>
                            <input type="text" placeholder="Série" value={serie} onChange={(e) => setSerie(e.target.value)}></input>
                        </div>
                        <div className="line">
                            <label htmlFor="searchAuteur">Auteur : </label>
                            <input type="text" placeholder='Auteur' value={auteur} onChange={(e) => setAuteur(e.target.value)}></input>
                        </div>
                        <div className="line">
                            <label htmlFor="searchTitre">Titre : </label>
                            <input type="text" placeholder='Titre' value={titre} onChange={(e) => setTitre(e.target.value)}></input>
                        </div>
                        <div className="line">
                            <label htmlFor="searchIsbn">Isbn : </label>
                            <input type="text" placeholder='ISBN' value={isbn} onChange={(e) => setIsbn(e.target.value)}></input>
                        </div>
                        <div className="bottomLine">
                            <button className="clearButton" onClick={clearFields}>Vider les champs</button>
                        </div>
                    </div>
                    <div className="results">
                        {bd.filter(item => {
                            return (
                                (!serie || item.serie?.toLowerCase().includes(serie.toLowerCase())) &&
                                (!auteur || item.auteur?.toLowerCase().includes(auteur.toLowerCase())) &&
                                (!titre || item.titre?.toLowerCase().includes(titre.toLowerCase())) &&
                                (!isbn || item.isbn?.toString().includes(isbn))
                            );
                        }).map((item, index) => (
                            <Link to={`/bd?isbn=${item.isbn}`} key={index}>
                                <div key={index}>
                                    <h2>{item.titre}</h2>
                                    <p>Série: {item.serie || 'N/A'}</p>
                                    <p>Auteur: {item.auteur.nom || 'N/A'}</p>
                                    <p>Note: {item.note || 'N/A'}</p>
                                    <p>Editeur: {item.editeur}</p>
                                    <div className="bdContainer">
                                        {item.image && <img src={item.image} alt={item.titre} className="bdImage"/>}
                                        <button onClick={() => handleLike(item.isbn)} className="likeButton">J'aime</button>
                                    </div>
                                    
                                </div>
                            </Link>
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <h1>Cherchez une série</h1>
                    <div className="searchForm">
                        <div className="line">
                            <label htmlFor="searchTitre">Titre : </label>
                            <input type="text" placeholder='Titre' value={titre} onChange={(e) => setTitre(e.target.value)}></input>
                        </div>
                        <div className="bottomLine">
                            <button className="clearButton" onClick={clearFields}>Vider le champ</button>
                        </div>
                    </div>
                    <div className="results">
                        {serieList.filter(item => {
                            return (
                                (!titre || item.titre?.toLowerCase().includes(titre.toLowerCase()))
                            );
                        }).map((item, index) => (
                            <Link to={`/serie?name=${item.titre}`} key={index}>
                                <div key={index}>
                                    <h2>{item.titre}</h2>
                                    <p>Nombre de BDs: {item.bdCount}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </>
            )}
            
        </div>
    )
}
export default Search;
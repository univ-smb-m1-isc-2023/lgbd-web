import './search.css'
import {useState, useEffect} from 'react';

function Search(){
    const [serie, setSerie] = useState('');
    const [auteur, setAuteur] = useState('');
    const [titre, setTitre] = useState('');
    const [isbn, setIsbn] = useState('');
    const [bd, setBD] = useState([]);

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

    const clearFields = () => {
        setSerie('');
        setAuteur('');
        setTitre('');
        setIsbn('');
    }

    useEffect(() => {
        getBD();
    }, []);

    return (
        <div className='searchContainer'>
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
                    <div key={index}>
                        <h2>{item.titre}</h2>
                        <p>Série: {item.serie || 'N/A'}</p>
                        <p>Auteur: {item.auteur || 'N/A'}</p>
                        <p>Note: {item.note || 'N/A'}</p>
                        <p>Editeur: {item.editeur}</p>
                        {item.image && <img src={item.image} alt={item.titre} />}
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Search;
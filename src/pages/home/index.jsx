import {Link} from 'react-router-dom';
import {useState} from 'react';
import './home.css';

function Home(){
    const [searchTerm, setSearchTerm] = useState('');
    const [bdNumber, setBdNumber] = useState(0);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    }
    
    return (
        <>
            <p className="message">LGBD, la référence pour tenir le compte de votre précieuse collection</p>
            <div className="search">
                <input 
                    type="text" 
                    placeholder="🔍 Recherche une BD" 
                    value={searchTerm} 
                    onChange={handleSearchChange}
                />            
            </div>
            <div className="bdNumber">
                <p>A ce jour, {bdNumber} bandes dessinées sont présentes sur le site.</p>
            </div>
            <div className="topFive">
                <p>Les 5 séries les plus populaires :</p>
                <div className="cardContainer">
                    <div className="card firstCard">
                        <p>1. Série 1</p>
                    </div>
                </div>
                <div className="cardContainer">
                    <div className="card">
                        <p>2. Série 2</p>
                    </div>
                    <div className="card">
                        <p>3. Série 3</p>
                    </div>
                    <div className="card">
                        <p>4. Série 4</p>
                    </div>
                    <div className="card">
                        <p>5. Série 5</p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Home;
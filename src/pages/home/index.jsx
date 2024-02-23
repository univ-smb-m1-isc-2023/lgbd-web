import {Link} from 'react-router-dom';
import {useState} from 'react';

function Home(){
    const [msgBack, setmsgBack] = useState('');
    const [msgBddOn, setmsgBddOn] = useState('');

    const backendTest = async () => {
        const response = await fetch('api/hello');
        const data = await response.json();
        setmsgBack(data.message);
    }

    const bddTest = async () => {
        const response = await fetch('api/bdd');
        const data = await response.json();
        setmsgBddOn(data.message);
    }
    return (
        <>
            <div className="home">
                <p>
                    Etat actuel du backend : {msgBack === '' ? 'Non connecté' : ''}
                </p>
                <p>
                    Etat actuel de la base de données : {msgBddOn == '' ? 'Non connectée' : ''}
                </p>
                <button onClick={backendTest}>Tester le backend</button>
                <button onClick={bddTest}>Tester la base de données</button>
            </div>
        </>
    )
}
export default Home;
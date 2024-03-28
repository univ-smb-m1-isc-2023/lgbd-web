import {Link} from 'react-router-dom';
import {useState} from 'react';

function Home(){
    const [msgBack, setmsgBack] = useState('');
    const [msgBddOn, setmsgBddOn] = useState('');

    const backendTest = async () => {
        try{
            const response = await fetch('/hello');
            const data = await getBody(response);
            setmsgBack(data);
        }catch(error){
            console.log(error);
        }
        
        // setmsgBack(data.message);
    }

    const getBody = async (response) => {
        const reader = response.body.getReader();
        let str = "";
        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                break;
            }
            str += new TextDecoder().decode(value);
        }
        return str;
    }

    const bddTest = async () => {
        const response = await fetch('/base');
        const data = await getBody(response);
        setmsgBddOn(data);
    }
    return (
        <>
            <div className="home">
                <p>
                    Etat actuel du backend : {msgBack === '' ? 'Non connecté' : msgBack}
                </p>
                <p>
                    Etat actuel de la base de données : {msgBddOn == '' ? 'Non connectée' : msgBddOn}
                </p>
                <button onClick={backendTest}>Tester le backend</button>
                <button onClick={bddTest}>Tester la base de données</button>
            </div>
        </>
    )
}
export default Home;
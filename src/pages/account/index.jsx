import {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../App';
import settingsWheel from '../../assets/settings-wheel.png';
import share from '../../assets/share.png';
import pencil from '../../assets/pencil.png';
import './account.css';

function Account(){
    const [bdCount, setBdCount] = useState(0);
    const {username} = useContext(AuthContext);
    const {user} = useContext(AuthContext);

    // const fetchBdCount = async () => {
    //     try{
    //         const res = await fetch('https://api-lgbd.oups.net/bdcount', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-type': 'application/json',
    //             },
    //             body: JSON.stringify({username})
    //         });

    //         if(res.ok){
    //             const data = await res.json();
    //             setBdCount(data.count);
    //         }else{
    //             throw new Error('Erreur lors de la récupération du nombre de BD');
    //         }
    //     }catch(err){
    //         console.error(err);
    //     }
    // }

    // useEffect(() => {
    //     fetchBdCount();
    // }, []);

    const sayHello = () => {
        console.log('Hello');
    }


    return(
        <>
            <div className="account">
                <h1>Mon compte</h1>
                <div className="firstLine">
                    <div className="accountInfos">
                        <p>Nom d'utilisateur: {username}</p>
                    </div>
                    {user.admin && <div className="admin">
                        <p>Admin</p>
                    </div>}
                    
                    <Link to='/usersettings'><img src={settingsWheel} alt="User settings" className="settings-button"/></Link>
                </div>
                <p className="bdCount">Votre nombre de BD : {bdCount}</p>
                <div className="bdContainer">
                    <p className="bdTitle">Mes BD</p>
                    <div className="bdList">
                        <p>BD 1</p>
                        <p>BD 2</p>
                        <p>BD 3</p>
                        <p>BD 4</p>
                        <p>BD 5</p>
                        <p>BD 6</p>
                        <p>BD 7</p>
                        <p>BD 8</p>
                    </div>
                </div>
                <div className="bottom">
                    <button onClick={sayHello} className="lendBD">
                        <img src={pencil} alt="Prêter une BD" className="lendBDimg"/>
                        Marquer une BD comme prêtée
                    </button>
                    <button onClick={sayHello} className="shareBD">
                        <img src={share} alt="Partager ma collection" className="shareBDimg"/>
                    </button>
                </div>
            </div>
        </>
    )
}
export default Account;
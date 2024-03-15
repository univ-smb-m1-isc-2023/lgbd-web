import {useState} from 'react';

function Account(){

    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState('');

    const getUserData = async () => {
        const response = await fetch('api/user');
        const data = await response.json();
        setUsername(data.username);
        setUserData(data);
    }


    return(
        <>
            <div className="account">
                <h1>Mon compte</h1>
                <p>
                    Bonjour {username}
                </p>
                <button onClick={getUserData}>Récupérer mes informations</button>
                <p>
                    {userData === '' ? '' : JSON.stringify(userData)}
                </p>
            </div>
        </>
    )
}
export default Account;
import { useState } from "react";

function Users(){
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    const getUsers = async () => {
        const response = await fetch('https://api-lgbd.oups.net/getUsers');
        if (!response.ok){
            setError('Erreur lors de la récupération des utilisateurs');
            return;
        }
        const data = await response.json();
        setUsers(data);
        console.log(data);
    }

    return (
        <>
            <div className="users">
                <h1>Utilisateurs</h1>
                {error && <p>{error}</p>}
                <button onClick={getUsers}>Récupérer les utilisateurs</button>
                {users.length === 0 ? (
                    <p>Aucun utilisateur en base</p>
                ): (
                    <ul>
                        {users.map((user, index) => {
                            return <li key={index}>{user.name} {user.email}</li>
                        })}
                    </ul>
                )}
            </div>
        </>
    )
}
export default Users;
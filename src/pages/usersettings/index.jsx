import "./usersettings.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../App";

function UserSettings() {
    const { user } = useContext(AuthContext);
    const {setIsLoggedIn} = useContext(AuthContext);
    const {setUser} = useContext(AuthContext);
    const {setUsername} = useContext(AuthContext);
    const [username, setUsernameC] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [showPasswordForm, setShowPasswordForm] = useState(false);

    const handleSubmitUserInfo = (event) => {
        event.preventDefault();
        const id = user.id;
        const response = fetch('https://api-lgbd.oups.net/updateUser', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({id, name : username, email, password : oldPassword})
        });
        console.log(response);
    };

    const handleSubmitPassword = (event) => {
        event.preventDefault();

        if(newPassword !== confPassword){
            console.log("les mots de passe ne correspondent pas");
            return;
        }

        const id = user.id;

        const response = fetch('https://api-lgbd.oups.net/updateUser', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({id, name : username, email, password : newPassword})
        });

        console.log(response);
    };

    const handleDeleteAccount = () => {
        const id = user.id;
        const response = fetch(`https://api-lgbd.oups.net/deleteUser/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            }
        });
        console.log(response);
        setIsLoggedIn(false);
        setUsername('');
        setUser({});
    };

    return(
        <>
            <div className="userSettings">
                <h1>Modification de mes informations :</h1>
                <div className="userSettingsForm">
                    {!showPasswordForm ? (
                        <form className="changeForm" onSubmit={handleSubmitUserInfo}>
                            <label htmlFor="username">Nom d'utilisateur</label>
                            <input type="text" id="username" name="username" required value={username} onChange={(e) => setUsernameC(e.target.value)}/>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <label htmlFor="password">Mot de passe actuel</label>
                            <input type="password" id="password" name="password" required value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}/>
                            <button type="submit">Mettre à jour</button>
                        </form>
                    ) : (
                        <form className="changeForm" onSubmit={handleSubmitPassword}>
                            <label htmlFor="username">Nom d'utilisateur</label>
                            <input type="text" id="username" name="username" required value={username} onChange={(e) => setUsernameC(e.target.value)}/>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <label htmlFor="password">Mot de passe actuel</label>
                            <input type="password" id="Oldpassword" name="Oldpassword" required value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}/>
                            <label htmlFor="password">Nouveau mot de passe</label>
                            <input type="password" id="Newpassword" name="Newpassword" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                            <label htmlFor="password">Confirmer le nouveau mot de passe</label>
                            <input type="password" id="Confpassword" name="Confpassword" required value={confPassword} onChange={(e) => setConfPassword(e.target.value)}/>
                            <button type="submit">Mettre à jour</button>
                        </form>
                    )}
                    <button onClick={() => setShowPasswordForm(!showPasswordForm)} className="switchForm">
                        {showPasswordForm ? "Change User Info" : "Change Password"}
                    </button>
                </div>
                <button className="deleteAccount" onClick={handleDeleteAccount}>Supprimer mon compte</button>
            </div>
        </>
    )
}
export default UserSettings;
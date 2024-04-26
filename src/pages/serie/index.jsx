import React, {useEffect, useState} from 'react';

function Serie(){
    const [serie, setSerie] = useState([]);
    const queryParameters = new URLSearchParams(window.location.search)
    const name = queryParameters.get("name")

    useEffect(() => {
        getSerie();
    }, []);

    const getSerie = async () => {
        const response = await fetch('https://api-lgbd.oups.net/serie/get?name='+name, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            },
        });
        setSerie(await response.json());
    }



    return(
        <>
            <div className="serie">
                {serie == undefined ? (
                    <p>Chargement...</p>
                ) : (
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <h1>{serie.nom}</h1>
                        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                            {serie.bd.map((bd, index) => (
                                <div key={index} style={{margin: '20px'}}>
                                    <h2>{bd.titre}</h2>
                                    <p>ISBN: {bd.isbn}</p>
                                    {bd.image && <img src={bd.image} alt={bd.titre} />}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
export default Serie;
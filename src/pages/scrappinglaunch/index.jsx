
function ScrappingLaunch(){
    const startScrap = () => {
        console.log('Scrapping en cours...');
    }
    
    return (
        <>
            <button onClick={startScrap}>Déclencher le scrapping</button>
        </>
    )
}
export default ScrappingLaunch;
import './../styles/Spiner.css'

interface Ispiner{

}


const Spiner: React.FunctionComponent<Ispiner> = () => {

    return(
        <div className="sk-chase">
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        </div>
    );
}


export default Spiner;
import Formulario from "../components/Formulario";




interface InewClientProps{

}

const NewClient: React.FunctionComponent<InewClientProps> = () => {

    return(
        <>
            <h2 className="font-black text-4xl text-blue-900">Nuevo Cliente</h2>
            <p className="mt-3">Llena los siguientes campos para registrar un cliente</p>
        
            <Formulario />
        </>
    );
}

export default NewClient;
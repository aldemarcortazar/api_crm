import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Formulario, { initialData } from "../components/Formulario";
import { Iuser } from '../interfaces/index';


interface IeditClientProps{

}

const EditClient: React.FunctionComponent<IeditClientProps> = () => {
    const [ client, setClient ] = useState<Iuser>(initialData);
    const [ loading, setLoading ] = useState( true );
    const { id } = useParams();

    useEffect( () => {

        const getClient = async () => {
            try{
                const url: string = `http://localhost:4000/clientes/${ id }`;
                // http://localhost:4000/clientes/${id}
                const response: Response = await fetch(url);
                const data: Iuser = await  response.json();
                setClient( data );
            }catch(error){
                console.error( { error } );
            }finally{
                setLoading( false );
            }
        }

        getClient();
    }, [] );

    return(
        <>
            { console.log({ client }) }
            <h2 className="font-black text-4xl text-blue-900">Editar Cliente</h2>
            <p className="mt-3">Utiliza este formulario para editar  datos de un Cliente</p>
        
            { 
                Object.keys( client ).length > 0 
                        ?   <Formulario 
                                client={ client }
                                loading={ loading }
                            />
                        : <p>Client ID no valido</p>
            }
            
        </>
    );
}

export default EditClient;
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { initialData } from '../components/Formulario';
import Spiner from '../components/Spiner';
import { Iuser } from '../interfaces';
interface ishowCliente{

}

const ShowClient: React.FunctionComponent<ishowCliente> = () => {

    const [ client, setClient ] = useState<Iuser>(initialData);
    const [ loading, setLoading ] = useState<boolean>(true);
    const { id } = useParams();
    // const [  ]

    useEffect( () => {
        const getClientApi = async () => {
            try{

                const url:string = `${ import.meta.env.VITE_API_URL }/${id}`;
                const answer: Response = await fetch( url );
                const result: Iuser    = await answer.json();
                setClient( result );

            }catch( error ){
                console.error({ error })
            }finally{
                setLoading( false );
            }
        }

        getClientApi();

    }, [] );

    return (
        <div>

            { loading ? <Spiner /> :(
                <>
                    { 
                        Object.keys( client ).length === 0 
                            ? <p> No hay resultados  </p>
                            : (
                                <>
                                    <h1 className='font-black text-4xl text-blue-900'> Ver cliente { client.name } </h1>
                                    <p className='mt-3'> Informacion del cliente </p>
                                    <p className='text-gray-600 text-2xl mt-10'> 
                                        <span className='text-gray-800 uppercase font-bold'>Cliente: </span>
                                        { client.name } 
                                    </p>

                                    <p className='text-gray-600 text-2xl mt-4'> 
                                        <span className='text-gray-800 uppercase font-bold'>Email:  </span>
                                        { client.email } 
                                    </p>
                                    {
                                        client.phone && (
                                            <p className='text-gray-600 text-2xl mt-4'> 
                                                <span className='text-gray-800 uppercase font-bold'>Telefono: </span>
                                                { client.phone } 
                                            </p>
                                        ) 
                                    }

                                    <p className='text-gray-600 text-2xl mt-4'> 
                                        <span className='text-gray-800 uppercase font-bold'>Empresa: </span>
                                        { client.empresa } 
                                    </p>

                                    {
                                        client.notas && (
                                            <p className='text-gray-600 text-2xl mt-4'> 
                                                <span className='text-gray-800 uppercase font-bold'>Notas: </span>
                                                { client.notas } 
                                            </p>
                                        )
                                    }

                                </>
                            )
                    }
                </>                
            ) }
        </div>
    );
}

export default ShowClient;
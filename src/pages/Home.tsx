import { useEffect, useState } from "react";
import Cliente from "../components/Cliente";
import { Iuser } from '../interfaces/index';



interface IhomeProps{

}

const Home: React.FunctionComponent<IhomeProps> = () => {

    const [ clientes, setClientes ] = useState<Iuser[]>([]);

    useEffect( () => {

        const getClientsApi = async () => {
            try{
                const url: string | boolean | undefined = import.meta.env.VITE_API_URL;
                const answer  = await fetch( url?.toString()|| '' );
                const result: Iuser[] = await answer.json();

                setClientes( result );

            }catch(error){
                console.log(error);
            }
        }

        getClientsApi();

    }, [] );

    const handleDelete = async ( id: number ) => {
        const answer: boolean = confirm('¿Deseas Eliminar Este Cliente?');
        if( !answer ) return;

        try{
            const url: string = `${ import.meta.env.VITE_API_URL }/${ id }`;
            const question: Response = await fetch( url, {
                method: 'DELETE'
            } );

            await question.json();
            const arrayClients: Iuser[] = clientes.filter( client => client.id !== id );
            setClientes(arrayClients);

        }catch(error: unknown){
            console.error({ error });
        }

    }

    return(
        <>
            <h1 className='font-black text-4xl text-blue-900'> Clientes </h1>  
            <p className="mt-3"> Administra tus clientes </p>

            <table className="w-full mt-5 table-auto shadow bg-white">
                <thead className="bg-blue-800 text-white">
                    <tr>
                        <th className="p-2"> Nombre</th>
                        <th className="p-2"> Contacto</th>
                        <th className="p-2"> Empresa</th>
                        <th className="p-2"> Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        clientes.map( cliente => <Cliente 
                                                    key={ cliente.id } 
                                                    cliente={ cliente } 
                                                    handleDelete={ handleDelete }
                                                /> )
                    }
                </tbody>
            </table>
        </>
    );
}

export default Home;
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Iuser } from '../interfaces/index';

interface IclienteProps{
    cliente: Iuser
    handleDelete: ( id: number  ) => void;
}


const Cliente: React.FunctionComponent<IclienteProps> = ({ cliente, handleDelete }) => {

    const navigate: NavigateFunction = useNavigate();

    const { name, empresa, email, phone, notas, id  } = cliente;


    return(
        <tr className='border-b cursor-pointer hover:bg-gray-200 '>
            <td className='p-3 text-center'> { name } </td>
            <td className='p-3 text-center'> 
                <p> <span className='text-gray-800 font-bold'> Email: { email } </span> </p>
                <p> <span className='text-gray-800 font-bold'> Tel: { phone } </span> </p>
                <p> <span className='text-gray-800 font-bold'> Email: { email } </span> </p>
            </td>
            <td className='p-3 text-center'> { empresa } </td>
            <td className='p-3 text-center'>


                <button
                    type='button'
                    className='bg-yellow-500 hover:bg-yellow-600 block w-full text-white p-2 uppercase font-bold text-xs mt-3 '
                    onClick={ () => navigate(`/clientes/${ id }`) }
                >
                    Ver
                </button>

                <button
                    type='button'
                    className='bg-blue-600 hover:bg-blue-700 block w-full text-white p-2 uppercase font-bold text-xs mt-3 '
                    onClick={ () => navigate(`/clientes/editar/${id}`) }
                >
                    Editar
                </button>

                <button
                    type='button'
                    className='bg-red-600 hover:bg-red-700 block w-full text-white p-2 uppercase font-bold text-xs mt-3'
                    onClick={ () => handleDelete( id! ) }
                >
                    Eliminar
                </button>
            </td>
        </tr>
    );
}

export default Cliente;
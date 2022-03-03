
import  { useEffect, useState } from "react";
import { IrespHttp } from '../interfaces/index';

const initialData: IrespHttp = {
    data: [],
    loading: true,
    error: false,
    errorMessague: ''
}

const useFetch = ( ): [ IrespHttp, ( url: string, options?: RequestInit  ) => Promise<void> ] => {

    const [ answer, setAnswer ] = useState<IrespHttp>(initialData);

    const getData = async ( url: string, options?: RequestInit ) =>{
        try{
            const answer = await fetch(url, options);
            const resultados = await answer.json();
            setAnswer({
                data: resultados,
                loading: false,
                error: false,
            });

        }catch( error ){
            setAnswer({
                data: [],
                loading: false,
                error: true,
                errorMessague: JSON.stringify( error ),
            });
        }
    }


    return [ answer, getData ];


}

export default useFetch;
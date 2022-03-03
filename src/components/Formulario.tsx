
import { Formik, Form, Field } from 'formik';
import { Iuser } from '../interfaces/index';
import * as Yup from 'yup';
import Alert from './Alert';
import { useNavigate } from 'react-router-dom';
import Spiner from './Spiner';

interface IformProps{
    client?: Iuser,
    loading?: boolean
}

export const initialData: Iuser = {
    name: '',
    empresa:'',
    email: '',
    phone: '',
    notas: '',
}

const Formulario: React.FunctionComponent<IformProps> = ({ client, loading }) => {

    const navigate = useNavigate();

    // tiene toda la forma con todos los campos y como los debe tener
    const newClientSquema =  Yup.object().shape({
        name: Yup.string()
                 .min(3, 'El Nombre es muy corto')  
                 .max(20, 'El Nombre es muy Largo' ) 
                 .required('El nombre del cliente es obligatorio'),
        empresa: Yup.string()
                    .required('El nombre de la empresa es Obligatorio'),
        email: Yup.string()
                  .email('Esto debe ser un email Valido') 
                  .required('El email Es obligatorio'),
        telefono: Yup.number()
                     .integer('Numero no valido')
                     .positive('Numero no Validos')
                     .typeError('El numerp no es valido'),

    });

    const handleSubmit = async ( values: Iuser) => {
        try{

            const url:string = `${import.meta.env.VITE_API_URL}/${ client?.id ? client.id : '' }`;
            const options: RequestInit = {
                method: `${ client?.id ? 'PUT': 'POST' }`,
                body: JSON.stringify( values ) ,
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            // const resultado =  useFetch(url, options);
            const answer = await fetch( url, options );
            const results = await answer.json();

            navigate('/clientes');
        }catch(error){
            console.error(error);
        }
    }

    return(
        loading ? <Spiner /> : (
            <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">

            <h2 className="text-gray-600 font-bold text-xl uppercase text-center">{ client ? 'Editar Cliente': 'Agregar Cliente' }  </h2>

            <Formik
                initialValues={ client ? client : initialData }
                enableReinitialize={ true }
                onSubmit={ async ( values, { resetForm } ) => {
                    await handleSubmit( values);

                    resetForm();
                    navigate('/clientes');
                } }
                validationSchema={ newClientSquema }
            >
                {( { errors, touched } ) => {
                    return(
                        <Form
                            className='mt-10'
                        >
                            <div className='mb-4'>
                                <label 
                                    htmlFor="name"
                                    className='text-gray-800'
                                > 
                                Nombre: 
                                </label>
                                <Field 
                                    type="text"
                                    id="name"
                                    className="mt-2 block full p-3 bg-gray-50 w-full"
                                    placeholder="Nombre del cliente"
                                    name='name'
                                /> 

                                {
                                    errors.name &&  touched.name ?(
                                        <Alert> { errors.name } </Alert>
                                    ): null
                                }
                                

                            </div> 

                            <div className='mb-4'>
                                <label 
                                    htmlFor="empresa"
                                    className='text-gray-800'
                                >
                                    Empresa
                                </label>

                                <Field 
                                    type="text"
                                    id="empresa"
                                    className='mt-2 block full p-3 bg-gray-50 w-full'
                                    placeholder='Empresa del cliente'
                                    name='empresa'
                                />

                                {
                                    errors.empresa && touched.empresa
                                                    && <Alert> { errors.empresa } </Alert>
                                }

                                
                            </div>

                            <div className='mb-4'>
                                <label 
                                    htmlFor="email"
                                    className='text-gray-800'
                                >
                                    E-Mail
                                </label>

                                <Field 
                                    type="email"
                                    id="email"
                                    className='mt-2 block full p-3 bg-gray-50 w-full'
                                    placeholder='Email del cliente'
                                    name='email'
                                /> 

                                {
                                    errors.email && touched.email
                                                    && <Alert> { errors.email } </Alert>
                                }
                            </div>


                            <div className='mb-4'>
                                <label 
                                    htmlFor="phone"
                                    className='text-gray-800'
                                >
                                    Telefono
                                </label>

                                <Field 
                                    type="tel"
                                    id="phone"
                                    className='mt-2 block full p-3 bg-gray-50 w-full'
                                    placeholder='Telefono del cliente'
                                    name='phone'
                                /> 

                                {
                                    errors.phone && touched.phone
                                                    && <Alert> { errors.phone } </Alert>
                                }
                            </div>

                            <div className='mb-4'>
                                <label 
                                    htmlFor="notas"
                                    className='text-gray-800'
                                >
                                    Notas
                                </label>

                                <Field 
                                    as="textarea"
                                    type="tel"
                                    id="notas"
                                    className='mt-2 block full p-3 bg-gray-50 h-40 w-full resize-none'
                                    placeholder='Notas del cliente'
                                    name='notas'
                                /> 
                            </div>

                            <input 
                                    type='submit'
                                    value={ client ? 'Editar Cliente': 'Agregar Cliente' }
                                    className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg cursor-pointer"
                            />
                        </Form> 
                    );
                }}
            
            </Formik>

            </div>
        )
    );
}

// Formulario.defaultProps={
//     client: initialData
// }

export default Formulario;


export interface Iuser{
    id?: number;
    name: string;
    empresa: string,
    email:  string,
    phone:  string,
    notas:  string,
}

export interface IrespHttp{
    data: Iuser[],
    loading: boolean,
    error: boolean,
    errorMessague?: string,
}
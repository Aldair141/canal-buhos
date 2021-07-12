export interface Usuario {
    _id?: string;
    appaterno: string;
    apmaterno: string;
    nombres: string;
    correo: string;
    password: string;
    genero: string;
    telefono: string;
}

export interface UsuarioLogin{
    usuario: string;
    password: string;
}
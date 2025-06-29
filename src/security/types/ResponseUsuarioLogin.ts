import Role from "../../role/models/Role";

export default interface ResponseUsuarioLogin {
    id: number;
    nome: string;
    usuario: string;
    foto: string;
    senha: string;
    roles: Role[];
    token: string;
}
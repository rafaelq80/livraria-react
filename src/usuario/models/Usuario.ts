import Role from "../../role/models/Role";

export default interface Usuario{
    id: number;
    nome: string;
    usuario: string;
    foto: string;
    senha: string;
    roles: Role[];
}
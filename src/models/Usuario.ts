import Role from "./Role";

export default interface Usuario{
    id: number;
    nome: string;
    usuario: string;
    foto: string;
    senha: string;
    roles: Role[];
}
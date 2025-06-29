import Usuario from "../../usuario/models/Usuario";


export default interface Role {
    id: number;
    nome: string;
    descricao: string;
    usuarios?: Usuario[];
}
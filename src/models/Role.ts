import Usuario from "./Usuario";

export default interface Role {
    id: number;
    nome: string;
    descricao: string;
    usuarios?: Usuario[];
}
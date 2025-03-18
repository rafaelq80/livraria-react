import Usuario from "./Usuario";

export default interface Role {
    id: number;
    nome: string;
    usuarios?: Usuario[];
}
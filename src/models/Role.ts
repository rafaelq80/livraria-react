import Usuario from "./Usuario";

export default interface Categoria {
    id: number;
    nome: string;
    usuarios?: Usuario[];
}
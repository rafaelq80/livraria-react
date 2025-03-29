import Produto from "./Produto";

export default interface Autor {
    id: number;
    nome: string;
    nacionalidade: string;
    produtos?: Produto[];
}
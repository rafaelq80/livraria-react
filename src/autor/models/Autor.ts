import Produto from "../../produto/models/Produto";

/**
 * Interface que representa um Autor no sistema
 */
export default interface Autor {
    /** ID único do autor */
    id: number;
    /** Nome completo do autor */
    nome: string;
    /** Nacionalidade do autor */
    nacionalidade: string;
    /** Data de criação do registro */
    createdAt?: string;
    /** Data da última atualização */
    updatedAt?: string;
    /** Lista de produtos associados ao autor*/
    produtos?: Produto[];
}
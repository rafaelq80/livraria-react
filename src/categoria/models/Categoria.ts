import Produto from "../../produto/models/Produto";

/**
 * Interface que representa uma Categoria no sistema
 */
export default interface Categoria {
    /** ID único da categoria */
    id: number;
    /** Tipo/nome da categoria */
    tipo: string;
    /** Data de criação do registro */
    createdAt?: string;
    /** Data da última atualização */
    updatedAt?: string;
    /** Lista de produtos associados à categoria */
    produtos?: Produto[];
}
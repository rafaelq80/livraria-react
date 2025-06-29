import Autor from "../../autor/models/Autor";
import Categoria from "../../categoria/models/Categoria";
import Editora from "../../editora/models/Editora";

export default interface Produto {
    id: number;
    titulo: string;
    sinopse: string;
    preco: number;
    desconto: number;
    foto?: string;
    isbn10?: string;
    isbn13?: string;
    paginas: number;
    idioma?: string;
    anoPublicacao: number;
    edicao: number;
    categoria: Categoria;
    editora: Editora;
    autores: Autor[];
    createdAt?: Date;
    updatedAt?: Date;
    precoComDesconto?: number;
    temDesconto?: boolean;
}
import Autor from "./Autor";
import Categoria from "./Categoria";
import Editora from "./Editora";

export default interface Produto {
    id: number;
    titulo: string;
    descricao: string;
    preco: number;
    desconto: number;
    foto: string;
    isbn10: string;
    isbn13: string;
    paginas: number;
    idioma: string;
    autores: Autor[];
    categoria: Categoria;
    editora: Editora;
}
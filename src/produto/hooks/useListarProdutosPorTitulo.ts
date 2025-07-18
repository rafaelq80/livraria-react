import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ensureArrayResponse, listar } from "../../services/AxiosService";
import { ErrorHandlerService } from "../../shared/handlers/ErrorHandlerService";
import messages from '../../shared/constants/messages';
import Produto from "../models/Produto";


export function useListarProdutosPorTitulo() {

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState<Produto[]>([]);
  const [filtroPreco, setFiltroPreco] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { titulo } = useParams<{ titulo: string }>();

  async function buscarTodosProdutos() {
    try {
      setIsLoading(true);
      const resposta = await listar<Produto[]>("/produtos");
      setProdutos(ensureArrayResponse<Produto>(resposta));
    } catch (error) {
      ErrorHandlerService.handleError(error, {
        errorMessage: messages.produto.loadError
      });
      setProdutos([]); // Garante que produtos seja um array vazio em caso de erro
    } finally {
      setIsLoading(false);
    }
  }

  function limparFiltroPreco() {
    setFiltroPreco("");
    const radioButtons = document.getElementsByName("preco");
    radioButtons.forEach((radio) => {
      (radio as HTMLInputElement).checked = false;
    });
  }

  function filtrarProdutos() {
    let resultado = produtos;

    if (titulo) {
      const normalizar = (str: string) =>
        str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();

      resultado = resultado.filter((produto) =>
        normalizar(produto.titulo).includes(normalizar(titulo))
      );
    }

    if (filtroPreco) {
      resultado = resultado.filter((produto) => {
        const preco = produto.preco;
        if (filtroPreco === "100") return preco <= 100;
        if (filtroPreco === "200") return preco > 100 && preco <= 200;
        if (filtroPreco === "m200") return preco > 200;
        return true;
      });
    }

    setProdutosFiltrados(resultado);
  }

  useEffect(() => {
    buscarTodosProdutos();
  }, []);

  useEffect(() => {
    filtrarProdutos();
  }, [titulo, produtos, filtroPreco]);

  return {
    titulo,
    produtosFiltrados,
    filtroPreco,
    isLoading,
    setFiltroPreco,
    limparFiltroPreco,
  };
}

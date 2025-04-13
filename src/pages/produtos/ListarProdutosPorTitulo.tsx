import { DNA } from "react-loader-spinner";
import CardProdutos from "../../components/produtos/cardprodutos/CardProdutos";
import { useListarProdutosPorTitulo } from "../../hooks/produtos/useListarProdutosPorTitulo";


function ListarProdutosPorTitulo() {
  const {
    titulo,
    produtosFiltrados,
    filtroPreco,
    isLoading,
    setFiltroPreco,
    limparFiltroPreco,
  } = useListarProdutosPorTitulo();

  return (
    <div className="bg-gray-200 flex flex-col justify-center container px-4">
      <h1 className="text-4xl text-center my-4">
        Resultados da busca pelo título <span className="italic text-red-700">{titulo}</span>
      </h1>

      {/* Filtros */}
      <div className="w-full max-w-4xl mx-auto mb-4 border rounded-lg border-slate-400 p-4 bg-white">
        <h3 className="text-base font-bold mb-2">Filtrar por Preço:</h3>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <label className="flex items-center gap-2">
            <input type="radio" name="preco" value="100" onChange={(e) => setFiltroPreco(e.target.value)} />
            Até R$ 100,00
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="preco" value="200" onChange={(e) => setFiltroPreco(e.target.value)} />
            R$ 100,00 - R$ 200,00
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="preco" value="m200" onChange={(e) => setFiltroPreco(e.target.value)} />
            Acima de R$ 200,00
          </label>
          <button
            onClick={limparFiltroPreco}
            className="bg-indigo-900 hover:bg-indigo-700 text-white py-1 px-4 rounded font-bold ml-auto"
          >
            Limpar
          </button>
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <DNA
          visible={true}
          height="200"
          width="200"
          ariaLabel="dna-loading"
          wrapperClass="mx-auto"
        />
      )}

      {/* Nenhum resultado */}
      {!isLoading && produtosFiltrados.length === 0 && (
        <div className="text-center my-4">
          <h2 className="text-2xl text-gray-600">
            Nenhum produto foi encontrado <br />
            {filtroPreco ? "no intervalo de preço selecionado" : ""}
          </h2>
        </div>
      )}

      {/* Resultados */}
      {!isLoading && produtosFiltrados.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {produtosFiltrados.map((produto) => (
            <CardProdutos key={produto.id} produto={produto} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ListarProdutosPorTitulo;

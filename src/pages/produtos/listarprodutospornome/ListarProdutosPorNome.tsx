import { useEffect, useState } from "react"
import { DNA } from "react-loader-spinner"
import { useParams } from "react-router-dom"
import CardProdutos from "../../../components/produtos/cardprodutos/CardProdutos"
import Produto from "../../../models/Produto"
import { listar } from "../../../services/AxiosService"
import { ToastAlerta } from "../../../utils/ToastAlerta"

function ListarProdutosPorNome() {
	const [produtos, setProdutos] = useState<Produto[]>([]) // Todos os Produtos
	const [produtosFiltrados, setProdutosFiltrados] = useState<Produto[]>([]) // Produtos Filtrados
	const [filtroPreco, setFiltroPreco] = useState<string>("")
	const [isLoading, setIsLoading] = useState(false)

	const { titulo } = useParams<{ titulo: string }>()

	async function buscarTodosProdutos() {
		try {
			setIsLoading(true)
			const resposta = await listar<Produto[]>("/produtos")
			setProdutos(resposta)
		} catch (error: unknown) {
			console.error("Erro: ", error)
			ToastAlerta("Erro ao carregar produtos!", "erro")
		} finally {
			setIsLoading(false)
		}
	}

	function filtrarProdutos() {
		let produtosFiltrados = produtos
		
		if (produtosFiltrados && titulo) {
			produtosFiltrados = produtosFiltrados.filter((produto) =>
				produto.titulo
					.normalize("NFD")
					.replace(/[\u0300-\u036f]/g, "")
					.toUpperCase()
				.includes(titulo
					.normalize("NFD")
					.replace(/[\u0300-\u036f]/g, "")
					.toUpperCase()
				)
			)
		}

		if (filtroPreco) {
			produtosFiltrados = produtosFiltrados.filter((produto) => {
				const preco = produto.preco
				if (filtroPreco === "100") return preco <= 100
				if (filtroPreco === "200") return preco > 100 && preco <= 200
				if (filtroPreco === "m200") return preco > 200
				return true
			})
		}

		setProdutosFiltrados(produtosFiltrados)
	}

	function limparFiltroPreco() {
		setFiltroPreco("")
		const radioButtons = document.getElementsByName("preco")
		radioButtons.forEach((radio) => {
			;(radio as HTMLInputElement).checked = false
		})
	}

	// Carrega todos os produtos na primeira vez
	useEffect(() => {
		buscarTodosProdutos()
	}, [])

	// Filtra os produtos de acordo com o termo da busca
	useEffect(() => {
		filtrarProdutos()
	}, [titulo, produtos, filtroPreco])

	return (
		<>
			<div className="bg-gray-200 flex flex-col justify-center container">
				<div className="flex flex-col mx-4">
					<h1 className="text-4xl text-center my-4">
						Resultados da busca pelo título <span className="italic text-red-700">{titulo}</span>
					</h1>

					{isLoading && (
						<DNA
							visible={true}
							height="200"
							width="200"
							ariaLabel="dna-loading"
							wrapperStyle={{}}
							wrapperClass="dna-wrapper mx-auto"
						/>
					)}

					{!isLoading && produtosFiltrados.length === 0 && (
						<div className="text-center my-4">
							<h2 className="text-2xl text-gray-600">
								Nenhum produto foi encontrado <br /> 
								{filtroPreco ? "no intervalo de preço selecionado" : ""}
							</h2>
						</div>
					)}

					<div className="flex gap-4">
						<div className="flex flex-col w-1/5 ml-4 my-8 p-3 border rounded-lg border-slate-400">
							<h3 className="text-base font-bold py-2">Preço:</h3>
							<div className="flex gap-2">
								<input
									type="radio"
									name="preco"
									value="100"
									onChange={(e) => setFiltroPreco(e.target.value)}
								/>
								<label htmlFor="100"> Até R$ 100,00</label>
							</div>
							<div className="flex gap-2">
								<input
									type="radio"
									name="preco"
									value="200"
									onChange={(e) => setFiltroPreco(e.target.value)}
								/>
								<label htmlFor="200"> R$ 100,00 - R$ 200,00</label>
							</div>
							<div className="flex gap-2">
								<input
									type="radio"
									name="preco"
									value="m200"
									onChange={(e) => setFiltroPreco(e.target.value)}
								/>
								<label htmlFor="m200">Acima de R$ 200,00</label>
							</div>
							<div className="mt-8">
								<button
									className="flex justify-center w-1/2 py-2 mx-auto font-bold text-white rounded bg-teal-500 hover:bg-teal-700"
									onClick={limparFiltroPreco}
								>
									Limpar
								</button>
							</div>
						</div>

						{!isLoading && produtosFiltrados.length > 0 && (
							<div className="container mx-auto my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
								{produtosFiltrados.map((produto) => (
									<CardProdutos key={produto.id} produto={produto} />
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	)
}

export default ListarProdutosPorNome

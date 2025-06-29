import { StrictContainerLoadingSpinner } from "../../shared/components/loading"
import CardProdutos from "../components/cardproduto/CardProduto"
import { useListarProdutos } from "../hooks/useListarProdutos"

function ListarProdutos() {
	const { produtos, isLoading } = useListarProdutos()

	const renderContent = () => {
		if (isLoading) {
			return <StrictContainerLoadingSpinner text="Carregando produtos..." />
		}

		if (produtos.length === 0) {
			return (
				<div className="text-center text-gray-500 mt-6 flex items-center justify-center">
					<p className="text-lg">Nenhum Produto encontrado.</p>
				</div>
			)
		}

		return (
			<div className="container mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-6">
				{produtos.map((produto) => (
					<CardProdutos key={produto.id} produto={produto} />
				))}
			</div>
		)
	}

	return (
		<div className="flex justify-center items-center p-2 md:p-4 min-h-[70vh]">
			{renderContent()}
		</div>
	)
}

export default ListarProdutos

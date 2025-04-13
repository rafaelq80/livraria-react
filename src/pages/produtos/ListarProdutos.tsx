import { DNA } from "react-loader-spinner"
import CardProdutos from "../../components/produtos/cardprodutos/CardProdutos"
import { useListarProdutos } from "../../hooks/produtos/useListarProdutos"

function ListarProdutos() {
	
	const { produtos, isLoading } = useListarProdutos()

	return (
		<div className="p-2 md:p-4">
			
			{isLoading ? (
				<DNA
					visible={true}
					height="200"
					width="200"
					ariaLabel="dna-loading"
					wrapperStyle={{}}
					wrapperClass="dna-wrapper mx-auto"
				/>
			) : produtos.length === 0 ? (
				<div className="text-center text-gray-500 mt-6">
					<p className="text-lg">Nenhum Produto encontrado.</p>
				</div>
			) : (
				<div className="container mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-6">
					{produtos.map((produto) => (
						<CardProdutos key={produto.id} produto={produto} />
					))}
				</div>
			)}
		</div>
	)
}

export default ListarProdutos

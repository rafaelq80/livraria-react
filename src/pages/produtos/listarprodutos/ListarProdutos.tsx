import { useEffect, useState } from "react"
import { DNA } from "react-loader-spinner"
import Produto from "../../../models/Produto"
import { listarProdutos } from "../../../services/AxiosService"
import CardProdutos from "../../../components/produtos/cardprodutos/CardProdutos"


function ListarProdutos() {

	const [produtos, setProdutos] = useState<Produto[]>([])

	async function buscarProdutos() {
		await listarProdutos("/produtos", setProdutos)
	}

	useEffect(() => {
		buscarProdutos()
	}, [produtos.length])

	return (
		<>
			{produtos === undefined && (
				<DNA
					visible={true}
					height="200"
					width="200"
					ariaLabel="dna-loading"
					wrapperStyle={{}}
					wrapperClass="dna-wrapper mx-auto"
				/>
			)}

			<div className="flex justify-center">
				<div className="my-2 mx-8 container flex flex-col">
					{produtos.length === 0 && (
						<span className="text-3xl text-center my-8">
							Nenhum produto foi encontrado
						</span>
					)}

					<div className="container mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
						{produtos.map((produto) => (
							<CardProdutos key={produto.id} produto={produto} />
						))}
					</div>
				</div>
			</div>
		</>
	)
}

export default ListarProdutos

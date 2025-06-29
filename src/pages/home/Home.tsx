import Carrossel from "../../shared/components/carrossel/Carrossel"
import ListarProdutos from "../../produto/pages/ListarProdutos"

function Home() {
	return (
		<>
			<div>
				<Carrossel />
			</div>
			<ListarProdutos />
		</>
	)
}

export default Home

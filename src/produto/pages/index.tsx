import DataTable from "../../shared/components/datatable/DataTable"
import { PageLoadingSpinner } from "../../shared/components/loading"
import { useListarProdutos } from "../hooks/useListarProdutos"
import { createProdutoColumns } from "./ProdutoColumns"
import messages from "../../shared/constants/messages"

function IndexProdutos() {
	const { produtos, isLoading, navigate, isAdmin } = useListarProdutos()
	const columns = createProdutoColumns()

	return (
		<div className="p-4">
			{isLoading ? (
				<PageLoadingSpinner text="Carregando produtos..." />
			) : (
				<div>
					<DataTable
						data={produtos}
						columns={columns}
						title="Produto"
						onAddNew={() => navigate("/cadastrarproduto")}
						columnSpans={["col-span-1", "col-span-4", "col-span-3", "col-span-3", "col-span-1",]}
						isAdmin={isAdmin}
						emptyMessage={messages.produto.emptyList}
						forbiddenMessage={messages.global.forbidden}
					/>
				</div>
			)}
		</div>
	)
}

export default IndexProdutos

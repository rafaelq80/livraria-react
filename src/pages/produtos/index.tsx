import { DNA } from "react-loader-spinner"
import DataTable from "../../components/datatable/DataTable"
import { useListarProdutos } from "../../hooks/produtos/useListarProdutos"
import { createProdutoColumns } from "./ProdutoColumns"

function IndexProdutos() {
	const { produtos, isLoading, navigate, isAdmin } = useListarProdutos()
	const columns = createProdutoColumns()

	return (
		<div className="p-4">
			{isLoading ? (
				<DNA
					visible={true}
					height="200"
					width="200"
					ariaLabel="dna-loading"
					wrapperStyle={{}}
					wrapperClass="dna-wrapper mx-auto"
				/>
			) : (
				<div>
					<DataTable
						data={produtos}
						columns={columns}
						title="Produto"
						onAddNew={() => navigate("/cadastrarproduto")}
						columnSpans={["col-span-1", "col-span-4", "col-span-3", "col-span-3", "col-span-1",]}
						isAdmin={isAdmin}
					/>
				</div>
			)}
		</div>
	)
}

export default IndexProdutos

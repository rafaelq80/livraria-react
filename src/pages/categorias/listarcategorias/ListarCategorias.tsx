import { DNA } from "react-loader-spinner"
import DataTable from "../../../components/datatable/DataTable"
import { useListarCategorias } from "../../../hooks/categorias/useListarCategorias"
import { createCategoriaColumns } from "./CategoriaColumns"

function ListarCategorias() {
	const { categorias, isLoading, isAdmin, navigate } = useListarCategorias()
	const columns = createCategoriaColumns()

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
						data={categorias}
						columns={columns}
						title="Categoria"
						onAddNew={() => navigate("/cadastrarcategoria")}
						columnSpans={["col-span-11", "col-span-1"]}
						isAdmin={isAdmin}
					/>
				</div>
			)}
		</div>
	)
}

export default ListarCategorias
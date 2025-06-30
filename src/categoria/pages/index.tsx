import DataTable from "../../shared/components/datatable/DataTable"
import { StrictContainerLoadingSpinner } from "../../shared/components/loading"
import { useListarCategorias } from "../hooks/useListarCategorias"
import { createCategoriaColumns } from "./CategoriaColumns"

function ListarCategorias() {
	const { categorias, isLoading, isAdmin, navigate, recarregarCategorias } = useListarCategorias()
	const columns = createCategoriaColumns(recarregarCategorias)

	return (
		<div className="p-4">
			{isLoading ? (
				<StrictContainerLoadingSpinner />
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
import DataTable from "../../shared/components/datatable/DataTable"
import { StrictContainerLoadingSpinner } from "../../shared/components/loading"
import { useListarAutores } from "../hooks/useListarAutores"
import { createAutorColumns } from "./AutorColumns"

function ListarAutores() {
	const { autores, isLoading, isAdmin, navigate, recarregarAutores } = useListarAutores()
	const columns = createAutorColumns(recarregarAutores)

	return (
		<div className="p-4 min-h-screen">
			{isLoading ? (
				<StrictContainerLoadingSpinner />
			) : (
				<div>
					<DataTable
						data={autores}
						columns={columns}
						title="Autor"
						onAddNew={() => navigate("/cadastrarautor")}
						columnSpans={["col-span-6", "col-span-5", "col-span-1"]}
						isAdmin={isAdmin}
					/>
				</div>
			)}
		</div>
	)
}

export default ListarAutores

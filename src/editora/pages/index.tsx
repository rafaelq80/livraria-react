import { PageLoadingSpinner } from "../../shared/components/loading"
import DataTable from "../../shared/components/datatable/DataTable"
import { useListarEditoras } from "../hooks/useListarEditoras"
import { createEditoraColumns } from "./EditoraColumns"

function ListarEditoras() {
	const { editoras, isLoading, isAdmin, navigate, recarregarEditoras  } = useListarEditoras()
	const columns = createEditoraColumns(recarregarEditoras)

	return (
		<div className="p-4">
			{isLoading ? (
				<PageLoadingSpinner text="Carregando editoras..." />
			) : (
				<div>
					<DataTable
						data={editoras}
						columns={columns}
						title="Editora"
						onAddNew={() => navigate("/cadastrareditora")}
						columnSpans={["col-span-11", "col-span-1"]}
						isAdmin={isAdmin}
					/>
				</div>
			)}
		</div>
	)
}

export default ListarEditoras

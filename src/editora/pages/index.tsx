import DataTable from "../../shared/components/datatable/DataTable"
import { StrictContainerLoadingSpinner } from "../../shared/components/loading"
import { useListarEditoras } from "../hooks/useListarEditoras"
import { createEditoraColumns } from "./EditoraColumns"
import messages from "../../shared/constants/messages"

function ListarEditoras() {
	const { editoras, isLoading, isAdmin, navigate, recarregarEditoras  } = useListarEditoras()
	const columns = createEditoraColumns(recarregarEditoras)

	return (
		<div className="p-4">
			{isLoading ? (
				<StrictContainerLoadingSpinner />
			) : (
				<div>
					<DataTable
						data={editoras}
						columns={columns}
						title="Editora"
						onAddNew={() => navigate("/cadastrareditora")}
						columnSpans={["col-span-11", "col-span-1"]}
						isAdmin={isAdmin}
						emptyMessage={messages.editora.emptyList}
						forbiddenMessage={messages.global.forbidden}
					/>
				</div>
			)}
		</div>
	)
}

export default ListarEditoras

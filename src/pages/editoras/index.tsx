import { DNA } from "react-loader-spinner"
import DataTable from "../../components/datatable/DataTable"
import { useListarEditoras } from "../../hooks/editoras/useListarEditoras"
import { createEditoraColumns } from "./EditoraColumns"

function ListarEditoras() {
	const { editoras, isLoading, isAdmin, navigate } = useListarEditoras()
	const columns = createEditoraColumns()

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

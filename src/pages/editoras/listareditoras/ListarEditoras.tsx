import { Plus } from "@phosphor-icons/react"
import { DNA } from "react-loader-spinner"
import DataTable from "../../../components/datatable/DataTable"
import { useListarEditoras } from "../../../hooks/editoras/useListarEditoras"
import { createEditoraColumns } from "./EditoraColumns"

function ListarEditoras() {
	const { editoras, isLoading, showButton, navigate } = useListarEditoras()
	const columns = createEditoraColumns()

	return (
		<div className="p-4">
			{showButton && (
				<div className="flex justify-end">
					<button
						onClick={() => navigate("/cadastrareditora")}
						className="flex items-center gap-2 bg-green-500 hover:bg-green-700 px-4 py-2 m-4 text-white font-bold rounded-xl"
					>
						<Plus size={32} className="h-4 w-4" />
						Nova Editora
					</button>
				</div>
			)}
			{isLoading ? (
				<DNA
					visible={true}
					height="200"
					width="200"
					ariaLabel="dna-loading"
					wrapperStyle={{}}
					wrapperClass="dna-wrapper mx-auto"
				/>
			) : editoras.length === 0 ? (
				<div className="text-center text-gray-500 mt-6">
					<p className="text-lg">Nenhuma Editora encontrada.</p>
				</div>
			) : (
				<div>
					<DataTable
						data={editoras}
						columns={columns}
						title="Editora"
						onAddNew={() => navigate("/cadastrareditora")}
						columnSpans={["col-span-11", "col-span-1"]}
					/>
				</div>
			)}
		</div>
	)
}

export default ListarEditoras

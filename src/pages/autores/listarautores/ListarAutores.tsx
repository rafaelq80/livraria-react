import { Plus } from "@phosphor-icons/react"
import { DNA } from "react-loader-spinner"
import { useListarAutores } from "../../../hooks/autores/useListarAutores"
import { createAutorColumns } from "./AutorColumns"
import DataTable from "../../../components/datatable/DataTable"

function ListarAutores() {
	const { autores, isLoading, showButton, navigate } = useListarAutores()
	const columns = createAutorColumns()

	return (
		<div className="p-4">
			{showButton && (
				<div className="flex justify-end">
					<button
						onClick={() => navigate("/cadastrarautor")}
						className="flex items-center gap-2 bg-green-500 hover:bg-green-700 px-4 py-2 m-4 text-white font-bold rounded-xl cursor-pointer"
					>
						<Plus size={32} className="h-4 w-4" />
						Adicionar Autor
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
			) : autores.length === 0 ? (
				<div className="text-center text-gray-500 mt-6">
					<p className="text-lg">Nenhum Autor encontrado.</p>
				</div>
			) : (
				<div>
					<DataTable
						data={autores}
						columns={columns}
						title="Autor"
						onAddNew={() => navigate("/cadastrarautor")}
						columnSpans={["col-span-6", "col-span-5", "col-span-1"]}
					/>
				</div>
			)}
		</div>
	)
}

export default ListarAutores

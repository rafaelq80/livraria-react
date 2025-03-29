import { Plus } from "@phosphor-icons/react"
import { DNA } from "react-loader-spinner"
import { createCategoriaColumns } from "./CategoriaColumns"
import DataTable from "../../../components/datatable/DataTable"
import { useListarCategorias } from "../../../hooks/categorias/useListarCategorias"

function ListarCategorias() {
	const { categorias, isLoading, showButton, navigate } = useListarCategorias()
	const columns = createCategoriaColumns()

	return (
		<div className="p-4">
			{showButton && (
				<div className="flex justify-end">
					<button
						onClick={() => navigate("/cadastrarcategoria")}
						className="flex items-center gap-2 bg-green-500 hover:bg-green-700 px-4 py-2 m-4 text-white font-bold rounded-xl cursor-pointer"
					>
						<Plus size={32} className="h-4 w-4" />
						Adicionar Categoria
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
			) : categorias.length === 0 ? (
				<div className="text-center text-gray-500 mt-6">
					<p className="text-lg">Nenhuma Categoria encontrada.</p>
				</div>
			) : (
				<div>
					<DataTable
						data={categorias}
						columns={columns}
						title="Categoria"
						onAddNew={() => navigate("/cadastrarcategoria")}
						columnSpans={["col-span-11", "col-span-1"]}
					/>
				</div>
			)}
		</div>
	)
}

export default ListarCategorias

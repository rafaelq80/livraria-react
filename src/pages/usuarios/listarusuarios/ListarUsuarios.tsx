import { Plus } from "@phosphor-icons/react"
import { DNA } from "react-loader-spinner"
import DataTable from "../../../components/datatable/DataTable"
import { useListarUsuarios } from "../../../hooks/usuarios/useListarUsuarios"
import { createUsuarioColumns } from "./UsuarioColumns"

function ListarUsuarios() {
	const { usuarios, isLoading, showButton, navigate } = useListarUsuarios()
	const columns = createUsuarioColumns()

	return (
		<div className="p-4">
			{showButton && (
				<div className="flex justify-end">
					<button
						onClick={() => navigate("/cadastro")}
						className="flex items-center gap-2 bg-green-500 hover:bg-green-700 px-4 py-2 m-4 text-white font-bold rounded-xl cursor-pointer"
					>
						<Plus size={32} className="h-4 w-4" />
						Novo Usuario
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
			) : usuarios.length === 0 ? (
				<div className="text-center text-gray-500 mt-6">
					<p className="text-lg">Nenhum Usuario encontrado.</p>
				</div>
			) : (
				<div>
					<DataTable
						data={usuarios}
						columns={columns}
						title="Usuario"
						onAddNew={() => navigate("/cadastro")}
						columnSpans={[
							"col-span-1",
							"col-span-4",
							"col-span-3",
							"col-span-3",
							"col-span-1",
						]}
					/>
				</div>
			)}
		</div>
	)
}

export default ListarUsuarios

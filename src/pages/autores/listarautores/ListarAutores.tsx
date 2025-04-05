import { DNA } from "react-loader-spinner"
import DataTable from "../../../components/datatable/DataTable"
import { useListarAutores } from "../../../hooks/autores/useListarAutores"
import { createAutorColumns } from "./AutorColumns"

function ListarAutores() {
	const { autores, isLoading, isAdmin, navigate } = useListarAutores()
	const columns = createAutorColumns()

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

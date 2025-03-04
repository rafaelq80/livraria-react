import { useNavigate } from "react-router-dom"
import Autor from "../../../models/Autor"
import DataTable from "../../datatable/DataTable"
import { createAutorColumns } from "./AutorColumns"

interface AutorDataTableProps {
	autores: Autor[]
}

function AutorDataTable({ autores }: AutorDataTableProps) {
	
	const navigate = useNavigate()
	const columns = createAutorColumns()

	return (
		<>
			<DataTable
				data={autores}
				columns={columns}
				onAddNew={() => navigate("/cadastrarautor")}
				searchPlaceholder="Pesquisar autores..."
				addButtonLabel="Novo Autor"
			/>
		</>
	)
}

export default AutorDataTable

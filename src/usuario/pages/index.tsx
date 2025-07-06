import DataTable from "../../shared/components/datatable/DataTable"
import { createUsuarioColumns } from "./UsuarioColumns"
import { useListarUsuarios } from "../hooks/useListarUsuarios"
import { PageLoadingSpinner } from "../../shared/components/loading"
import messages from "../../shared/constants/messages"

function ListarUsuarios() {
	const { usuarios, isLoading, isAdmin, navigate } = useListarUsuarios()
	const columns = createUsuarioColumns()

	const renderContent = () => {
		if (isLoading) {
			return <PageLoadingSpinner text="Carregando usuários..." />
		}

		return (
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
					isAdmin={isAdmin}
					emptyMessage={messages.usuario.emptyList}
					forbiddenMessage={messages.global.forbidden}
				/>
			</div>
		)
	}

	return <div className="flex justify-center items-center p-2 md:p-8">{renderContent()}</div>
}

export default ListarUsuarios

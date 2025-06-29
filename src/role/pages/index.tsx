import { PageLoadingSpinner } from "../../shared/components/loading"
import DataTable from "../../shared/components/datatable/DataTable"
import { useListarRoles } from "../hooks/useListarRoles"
import { createRoleColumns } from "./RoleColumns"

function ListarRoles() {
	const { roles, isLoading, isAdmin, navigate } = useListarRoles()
	const columns = createRoleColumns()

	return (
		<div className="p-4">
			{isLoading ? (
				<PageLoadingSpinner text="Carregando roles..." />
			) : (
				<div>
					<DataTable
						data={roles}
						columns={columns}
						title="Role"
						onAddNew={() => navigate("/cadastrarrole")}
						columnSpans={["col-span-5", "col-span-6", "col-span-1"]}
						isAdmin={isAdmin}
					/>
				</div>
			)}
		</div>
	)
}

export default ListarRoles

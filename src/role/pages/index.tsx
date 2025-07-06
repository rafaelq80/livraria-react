import DataTable from "../../shared/components/datatable/DataTable"
import { StrictContainerLoadingSpinner } from "../../shared/components/loading"
import { useListarRoles } from "../hooks/useListarRoles"
import { createRoleColumns } from "./RoleColumns"
import messages from "../../shared/constants/messages"

function ListarRoles() {
	const { roles, isLoading, isAdmin, navigate, recarregarRoles } = useListarRoles()
	const columns = createRoleColumns(recarregarRoles)

	return (
		<div className="p-4">
			{isLoading ? (
				<StrictContainerLoadingSpinner />
			) : (
				<div>
					<DataTable
						data={roles}
						columns={columns}
						title="Role"
						onAddNew={() => navigate("/cadastrarrole")}
						columnSpans={["col-span-5", "col-span-6", "col-span-1"]}
						isAdmin={isAdmin}
						emptyMessage={messages.role.emptyList}
						forbiddenMessage={messages.global.forbidden}
					/>
				</div>
			)}
		</div>
	)
}

export default ListarRoles

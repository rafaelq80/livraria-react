import { DNA } from "react-loader-spinner"
import DataTable from "../../components/datatable/DataTable"
import { useListarRoles } from "../../hooks/roles/useListarRoles"
import { createRoleColumns } from "./RoleColumns"

function ListarRoles() {
	const { roles, isLoading, isAdmin, navigate } = useListarRoles()
	const columns = createRoleColumns()

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

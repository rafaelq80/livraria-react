import { Plus } from "@phosphor-icons/react"
import { DNA } from "react-loader-spinner"
import DataTable from "../../../components/datatable/DataTable"
import { useListarRoles } from "../../../hooks/roles/useListarRoles"
import { createRoleColumns } from "./RoleColumns"

function ListarRoles() {
	const { roles, isLoading, showButton, message, navigate } = useListarRoles()
	const columns = createRoleColumns()

	return (
		<div className="p-4">
			{showButton && (
				<div className="flex justify-end">
					<button
						onClick={() => navigate("/cadastrarrole")}
						className="flex items-center gap-2 bg-green-500 hover:bg-green-700 px-4 py-2 m-4 text-white font-bold rounded-xl cursor-pointer"
					>
						<Plus size={32} className="h-4 w-4" />
						Novo Role
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
			) : roles.length === 0 ? (
				<div className="text-center text-gray-500 mt-6">
					<p className="text-lg">{message ? message : 'Nenhum Role encontrado.'}</p>
				</div>
			) : (
				<div>
					<DataTable
						data={roles}
						columns={columns}
						title="Role"
						onAddNew={() => navigate("/cadastrarrole")}
						columnSpans={["col-span-5", "col-span-6", "col-span-1"]}
					/>
				</div>
			)}
		</div>
	)
}

export default ListarRoles

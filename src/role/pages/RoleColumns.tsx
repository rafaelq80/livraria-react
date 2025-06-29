import { Pencil, Trash } from "@phosphor-icons/react"
import { ColumnDef } from "@tanstack/react-table"
import { useNavigate } from "react-router-dom"
import Role from "../../models/Role"

export function createRoleColumns(): ColumnDef<Role>[] {
	const navigate = useNavigate()

	return [
		{
			accessorKey: "nome",
			header: "Role",
			cell: (props) => props.getValue(),
		},
		{
			accessorKey: "descricao",
			header: "Descrição",
			cell: (props) => props.getValue(),
		},
		{
			id: "actions",
			header: "",
			cell: ({ row }) => (
				<div className="flex justify-center items-center gap-2">
					<button
						onClick={() => navigate(`/editarrole/${row.original.id}`)}
						className="text-blue-500 hover:text-blue-700 cursor-pointer"
					>
						<Pencil size={32} className="h-5 w-5 text-blue-500" />
					</button>
					<button
						onClick={() => navigate(`/deletarrole/${row.original.id}`)}
						className="text-red-500 hover:text-red-700 cursor-pointer"
					>
						<Trash size={32} className="h-5 w-5 text-red-500" />
					</button>
				</div>
			),
		},
	] as const satisfies ColumnDef<Role>[]
}

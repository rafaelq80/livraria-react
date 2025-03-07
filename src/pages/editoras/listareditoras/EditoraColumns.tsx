import { Pencil, Trash } from "@phosphor-icons/react"
import { ColumnDef } from "@tanstack/react-table"
import { useNavigate } from "react-router-dom"
import Editora from "../../../models/Editora"

export function createEditoraColumns(): ColumnDef<Editora>[] {
	const navigate = useNavigate()

	return [
		{
			accessorKey: "nome",
			header: "Editora",
			cell: (props) => props.getValue(),
		},
		{
			id: "actions",
			header: "",
			cell: ({ row }) => (
				<div className="flex justify-center items-center gap-2">
					<button
						onClick={() => navigate(`/editareditora/${row.original.id}`)}
						className="text-blue-500 hover:text-blue-700"
					>
						<Pencil size={32} className="h-5 w-5 text-blue-500" />
					</button>
					<button
						onClick={() => navigate(`/deletareditora/${row.original.id}`)}
						className="text-red-500 hover:text-red-700"
					>
						<Trash size={32} className="h-5 w-5 text-red-500" />
					</button>
				</div>
			),
		},
	] as const satisfies ColumnDef<Editora>[]
}

import { Pencil, Trash } from "@phosphor-icons/react"
import { ColumnDef } from "@tanstack/react-table"
import { useNavigate } from "react-router-dom"
import Categoria from "../../../models/Categoria"

export function createCategoriaColumns(): ColumnDef<Categoria>[] {
	const navigate = useNavigate()

	return [
		{
			accessorKey: "tipo",
			header: "Categoria",
			cell: (props) => props.getValue(),
		},
		{
			id: "actions",
			header: "",
			cell: ({ row }) => (
				<div className="flex justify-center items-center gap-2">
					<button
						onClick={() => navigate(`/editarcategoria/${row.original.id}`)}
						className="text-blue-500 hover:text-blue-700"
					>
						<Pencil size={32} className="h-5 w-5 text-blue-500" />
					</button>
					<button
						onClick={() => navigate(`/deletarcategoria/${row.original.id}`)}
						className="text-red-500 hover:text-red-700"
					>
						<Trash size={32} className="h-5 w-5 text-red-500" />
					</button>
				</div>
			),
		},
	] as const satisfies ColumnDef<Categoria>[]
}

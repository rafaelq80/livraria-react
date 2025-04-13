import { ColumnDef } from "@tanstack/react-table"
import Autor from "../../models/Autor"
import { useNavigate } from "react-router-dom"
import { Pencil, Trash } from "@phosphor-icons/react"

export function createAutorColumns(): ColumnDef<Autor>[] {
	const navigate = useNavigate()

	return [
		{
			accessorKey: "nome",
			header: "Nome",
			cell: (props) => props.getValue(),
		},
		{
			accessorKey: "nacionalidade",
			header: "Nacionalidade",
			cell: (props) => props.getValue(),
		},
		{
			id: "actions",
			header: "",
			cell: ({ row }) => (
				<div className="flex justify-center items-center gap-2">
					<button
						onClick={() => navigate(`/editarautor/${row.original.id}`)}
						className="text-blue-500 hover:text-blue-700 cursor-pointer"
					>
						<Pencil size={32} className="h-5 w-5 text-blue-500" />
					</button>
					<button
						onClick={() => navigate(`/deletarautor/${row.original.id}`)}
						className="text-red-500 hover:text-red-700 cursor-pointer"
					>
						<Trash size={32} className="h-5 w-5 text-red-500" />
					</button>
				</div>
			),
		},
	] as const satisfies ColumnDef<Autor>[]
}

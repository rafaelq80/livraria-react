import { PencilIcon } from "@phosphor-icons/react"
import { ColumnDef } from "@tanstack/react-table"
import { useNavigate } from "react-router-dom"
import DeleteButton from "../../shared/components/DeleteConfirmationModal/DeleteButton"
import { useDeleteAutor } from "../hooks/useDeleteAutor"
import Autor from "../models/Autor"

export function createAutorColumns(onAutorDeleted?: () => void): ColumnDef<Autor>[] {
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
			cell: ({ row }) => {
				const autor = row.original
				const { excluirAutor, isLoading } = useDeleteAutor(
					autor.id.toString(),
					onAutorDeleted
				)

				return (
					<div className="flex justify-center items-center gap-2">
						<button
							onClick={() => navigate(`/editarautor/${row.original.id}`)}
							className="text-blue-500 hover:text-blue-700 cursor-pointer"
						>
							<PencilIcon size={32} className="h-5 w-5 text-blue-500" />
						</button>
						<DeleteButton<Autor>
							item={autor}
							onDelete={async () => {
								await excluirAutor()
								return Promise.resolve()
							}}
							disabled={isLoading}
							modalTitle="Excluir Autor"
							itemName={`o autor "${autor.nome}"`}
						/>
					</div>
				)
			},
		},
	] as const satisfies ColumnDef<Autor>[]
}

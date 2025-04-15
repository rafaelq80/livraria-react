import { Pencil } from "@phosphor-icons/react"
import { ColumnDef } from "@tanstack/react-table"
import { useNavigate } from "react-router-dom"
import DeleteButton from "../../components/modal/DeleteButton"
import { useDeleteEditora } from "../../hooks/editoras/useDeleteEditora"
import Editora from "../../models/Editora"

export function createEditoraColumns(onEditoraDeleted?: () => void): ColumnDef<Editora>[] {
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
			cell: ({ row }) => {
				const editora = row.original
				const { excluirEditora, isLoading } = useDeleteEditora(
					editora.id.toString(),
					onEditoraDeleted
				)
				return (
					<div className="flex justify-center items-center gap-2">
						<button
							onClick={() => navigate(`/editareditora/${row.original.id}`)}
							className="text-blue-500 hover:text-blue-700 cursor-pointer"
						>
							<Pencil size={32} className="h-5 w-5 text-blue-500" />
						</button>
						<DeleteButton<Editora>
							item={editora}
							onDelete={async () => {
								await excluirEditora()
								return Promise.resolve()
							}}
							disabled={isLoading}
							modalTitle="Excluir Editora"
							itemName={`a Editora "${editora.nome}"`}
						/>
					</div>
				)
			},
		},
	] as const satisfies ColumnDef<Editora>[]
}

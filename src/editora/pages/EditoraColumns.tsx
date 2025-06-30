import { PencilIcon } from "@phosphor-icons/react"
import { ColumnDef } from "@tanstack/react-table"
import { useNavigate } from "react-router-dom"
import DeleteButton from "../../shared/components/deletemodal/DeleteButton"
import { useDeleteEditora } from "../hooks/useDeleteEditora"
import Editora from "../models/Editora"
import { TooltipButton } from "../../shared/components/tooltipbutton/TooltipButton"

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
						<TooltipButton
							label="Editar editora"
							onClick={() => navigate(`/editareditora/${editora.id}`)}
							className="text-blue-500 hover:text-blue-700 cursor-pointer"
							aria-label="Editar editora"
						>
							<PencilIcon size={32} className="h-5 w-5 text-blue-500" />
						</TooltipButton>
						<TooltipButton label="Excluir editora" aria-label="Excluir editora">
							<DeleteButton<Editora>
								item={editora}
								onDelete={async () => {
									await excluirEditora()
									return Promise.resolve()
								}}
								disabled={isLoading}
								modalTitle="Excluir Editora"
								itemName={`a editora ${editora.nome}`}
								tooltipLabel="Excluir editora"
							/>
						</TooltipButton>
					</div>
				)
			},
		},
	] as const satisfies ColumnDef<Editora>[]
}

import { PencilIcon } from "@phosphor-icons/react"
import { ColumnDef } from "@tanstack/react-table"
import { useNavigate } from "react-router-dom"
import DeleteButton from "../../shared/components/deletemodal/DeleteButton"
import { TooltipButton } from "../../shared/components/tooltipbutton/TooltipButton"
import { useDeleteRole } from "../hooks/useDeleteRole"
import Role from "../models/Role"

export function createRoleColumns(onRoleDeleted?: () => void): ColumnDef<Role>[] {
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
			cell: ({ row }) => {
				const role = row.original
				const { excluirRole, isLoading } = useDeleteRole(role.id.toString(), onRoleDeleted)

				return (
					<div className="flex justify-center items-center gap-2">
						<TooltipButton
							label="Editar role"
							onClick={() => navigate(`/editarrole/${role.id}`)}
							className="text-blue-500 hover:text-blue-700 cursor-pointer"
							aria-label="Editar role"
						>
							<PencilIcon size={32} className="h-5 w-5 text-blue-500" />
						</TooltipButton>

						<DeleteButton<Role>
							item={role}
							onDelete={async () => {
								await excluirRole()
								return Promise.resolve()
							}}
							disabled={isLoading}
							modalTitle="Excluir Role"
							itemName={`a role ${role.nome}`}
							tooltipLabel="Excluir role"
						/>
					</div>
				)
			},
		},
	] as const satisfies ColumnDef<Role>[]
}

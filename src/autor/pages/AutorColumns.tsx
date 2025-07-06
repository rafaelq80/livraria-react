import { PencilIcon } from "@phosphor-icons/react"
import { ColumnDef } from "@tanstack/react-table"
import { useNavigate } from "react-router-dom"
import DeleteButton from "../../shared/components/deletemodal/DeleteButton"
import { useDeleteAutor } from "../hooks/useDeleteAutor"
import Autor from "../models/Autor"
import { TooltipButton, TooltipWrapper } from "../../shared/components/tooltipbutton/TooltipButton"

/**
 * Factory para criar as colunas da tabela de autores
 *
 * @param onAutorDeleted Callback opcional chamado após exclusão bem-sucedida
 * @returns Array de definições de colunas para TanStack Table
 */
export function createAutorColumns(onAutorDeleted?: () => void): ColumnDef<Autor>[] {
	const navigate = useNavigate()

	return [
		{
			accessorKey: "nome",
			header: "Nome",
			cell: (props) => props.getValue(), // Exibe o nome do autor
		},
		{
			accessorKey: "nacionalidade",
			header: "Nacionalidade",
			cell: (props) => props.getValue(), // Exibe a nacionalidade do autor
		},
		{
			id: "actions",
			header: "",
			/**
			 * Renderiza os botões de ação (editar e excluir) para cada linha
			 * Usa hooks de exclusão individualmente por linha (padrão em tabelas reativas)
			 */
			cell: ({ row }) => {
				const autor = row.original
				const { excluirAutor, isLoading } = useDeleteAutor(
					autor.id.toString(),
					onAutorDeleted
				)

				return (
					<div className="flex justify-center items-center gap-2">
						{/* Botão de editar autor */}
						<TooltipButton
							label="Editar autor"
							onClick={() => navigate(`/editarautor/${row.original.id}`)}
							className="text-blue-500 hover:text-blue-700 cursor-pointer"
							aria-label="Editar autor"
						>
							<PencilIcon size={32} className="h-5 w-5 text-blue-500" />
						</TooltipButton>
						{/* Botão de excluir autor, com modal de confirmação */}
						<TooltipWrapper label="Excluir autor">
							<DeleteButton<Autor>
								item={autor}
								onDelete={async () => {
									await excluirAutor()
									return Promise.resolve()
								}}
								disabled={isLoading}
								modalTitle="Excluir Autor"
								itemName={`o autor ${autor.nome}`}
								tooltipLabel="Excluir autor"
							/>
						</TooltipWrapper>
					</div>
				)
			},
		},
	] as const satisfies ColumnDef<Autor>[]
}

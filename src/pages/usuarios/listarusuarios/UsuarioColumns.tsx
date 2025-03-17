import { Pencil, Trash } from "@phosphor-icons/react"
import { CellContext, ColumnDef } from "@tanstack/react-table"
import { useNavigate } from "react-router-dom"
import Usuario from "../../../models/Usuario"
import Role from "../../../models/Role"

export function createUsuarioColumns(): ColumnDef<Usuario>[] {
	const navigate = useNavigate()

	return [
		{
			accessorKey: "foto",
			header: "Foto",
			cell: (props) => {
				const url = props.getValue() as string
				return url ? (
				   <div className="w-10 h-10 relative">
					   <img
						   src={url}
						   alt="Foto do Usuário"
						   className="w-full h-full object-cover rounded-full"
						   onError={(e) => {
							   e.currentTarget.src =
								   'https://ik.imagekit.io/vzr6ryejm/rh/icones/smiley-sad.svg?updatedAt=1730246853172'
						   }}
					   />
				   </div>
			   ) : (
				   <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
					   <span className="text-gray-500 text-xs">Sem foto</span>
				   </div>
			   )
		   }
		},
		{
			accessorKey: "nome",
			header: "Nome",
			cell: (props) => props.getValue()
		},
		{
			accessorKey: "usuario",
			header: "Usuário",
			cell: (props) => props.getValue(),
		},
		{
			accessorKey: "roles",
			header: "Permissões",
			cell: ({ getValue }: CellContext<Usuario, unknown>) => {
				const roles = getValue() as Role[] // Garantir que 'roles' seja tratado como um array de Role
				return roles.map((role) => role.nome).join(" | ")
			},
		},
		{
			id: "actions",
			header: "",
			cell: ({ row }) => (
				<div className="flex justify-center items-center gap-2">
					<button
						onClick={() => navigate(`/editarusuario/${row.original.id}`)}
						className="text-blue-500 hover:text-blue-700"
					>
						<Pencil size={32} className="h-5 w-5 text-blue-500" />
					</button>
					<button
						onClick={() => navigate(`/deletarusuario/${row.original.id}`)}
						className="text-red-500 hover:text-red-700"
					>
						<Trash size={32} className="h-5 w-5 text-red-500" />
					</button>
				</div>
			),
		},
	] as const satisfies ColumnDef<Usuario>[]
}

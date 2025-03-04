import { Pencil, Trash } from '@phosphor-icons/react'
import { createColumnHelper } from '@tanstack/react-table'
import { useNavigate } from 'react-router-dom'
import Role from '../../../models/Role'


const columnHelper = createColumnHelper<Role>()

export function createRoleColumns() {
	const navigate = useNavigate()

	return [
		columnHelper.accessor('nome', {
			header: 'Role',
			cell: (info) => info.getValue(),
		}),
		columnHelper.display({
			id: 'actions',
			header: 'Ações',
			cell: (info) => {
				const id = info.row.original.id
				return (
					<div className="flex items-center justify-center gap-2">
						<button
							onClick={() =>
								navigate(`/atualizarrole/${id}`)
							}
						>
							<Pencil
								size={32}
								className="h-5 w-5 text-blue-500"
							/>
						</button>
						<button
							onClick={() =>
								navigate(`/deletarrole/${id}`)
							}
						>
							<Trash size={32} className="h-5 w-5 text-red-500" />
						</button>
					</div>
				)
			},
		}),
	]
}

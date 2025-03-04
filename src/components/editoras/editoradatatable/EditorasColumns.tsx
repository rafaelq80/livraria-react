import { Pencil, Trash } from '@phosphor-icons/react'
import { createColumnHelper } from '@tanstack/react-table'
import { useNavigate } from 'react-router-dom'
import Editora from '../../../models/Editora'


const columnHelper = createColumnHelper<Editora>()

export function createEditoraColumns() {
	const navigate = useNavigate()

	return [
		columnHelper.accessor('nome', {
			header: 'Editora',
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
								navigate(`/atualizareditora/${id}`)
							}
						>
							<Pencil
								size={32}
								className="h-5 w-5 text-blue-500"
							/>
						</button>
						<button
							onClick={() =>
								navigate(`/deletareditora/${id}`)
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

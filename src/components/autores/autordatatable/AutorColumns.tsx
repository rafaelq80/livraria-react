import { Pencil, Trash } from '@phosphor-icons/react'
import { createColumnHelper } from '@tanstack/react-table'
import { useNavigate } from 'react-router-dom'
import Autor from '../../../models/Autor'


const columnHelper = createColumnHelper<Autor>()

export function createAutorColumns() {
	const navigate = useNavigate()

	return [
		columnHelper.accessor('nome', {
			header: 'Nome',
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor('nacionalidade', {
			header: 'Nacionalidade',
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
								navigate(`/atualizarautor/${id}`)
							}
						>
							<Pencil
								size={32}
								className="h-5 w-5 text-blue-500"
							/>
						</button>
						<button
							onClick={() =>
								navigate(`/deletarautor/${id}`)
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

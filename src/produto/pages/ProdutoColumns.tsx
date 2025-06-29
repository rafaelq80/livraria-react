import { Pencil, Trash } from "@phosphor-icons/react"
import { ColumnDef } from "@tanstack/react-table"
import { useNavigate } from "react-router-dom"
import Produto from "../models/Produto"

export function createProdutoColumns(): ColumnDef<Produto>[] {
	const navigate = useNavigate()

	return [
		{
		accessorKey: "foto",
			header: "Capa",
			cell: (props) => {
				const url = props.getValue() as string
				return url ? (
				   <div className="w-10 h-12 relative">
					   <img
						   src={url}
						   alt="Foto do Produto"
						   className="w-full h-full object-cover"
						   onError={(e) => {
							   e.currentTarget.src =
								   'https://ik.imagekit.io/vzr6ryejm/livraria/book-open.png?updatedAt=1749633758148'
						   }}
					   />
				   </div>
			   ) : (
				   <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
					   <img
						   src="https://ik.imagekit.io/vzr6ryejm/livraria/book-open.png?updatedAt=1749633758148"
						   alt="Foto do Produto"
						   className="w-full h-full object-cover rounded-full"
					   />
				   </div>
			   )
		   }
		},
		{
			accessorKey: "titulo",
			header: "Título",
			cell: (props) => props.getValue(),
		},
		{
			accessorKey: "preco",
			header: "Preço",
			cell: (props) => {
				const valor = props.getValue() as number;
				return valor.toLocaleString("pt-BR", {
					style: "currency",
					currency: "BRL",
				});
			}
		},
		{
			accessorKey: "isbn10",
			header: "ISBN-10",
			cell: (props) => {
				const raw = props.getValue() as string;
		
				// Verifica se são exatamente 10 dígitos
				if (!/^\d{10}$/.test(raw)) return raw;
		
				// Formata usando regex
				return raw.replace(/^(\d)(\d{3})(\d{5})(\d)$/, "$1-$2-$3-$4");
			},
		},
		{
			id: "actions",
			header: "",
			cell: ({ row }) => (
				<div className="flex justify-center items-center gap-2">
					<button
						onClick={() => navigate(`/editarproduto/${row.original.id}`)}
						className="text-blue-500 hover:text-blue-700 cursor-pointer"
					>
						<Pencil size={32} className="h-5 w-5 text-blue-500" />
					</button>
					<button
						onClick={() => navigate(`/deletarproduto/${row.original.id}`)}
						className="text-red-500 hover:text-red-700 cursor-pointer"
					>
						<Trash size={32} className="h-5 w-5 text-red-500" />
					</button>
				</div>
			),
		},
	] as const satisfies ColumnDef<Produto>[]
}

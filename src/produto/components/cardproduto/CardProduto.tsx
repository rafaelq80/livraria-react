import { BookOpenIcon, PencilIcon, ShoppingCartIcon, TrashIcon } from "@phosphor-icons/react"
import { Link } from "react-router-dom"
import { useAuth } from "../../../shared/store/AuthStore"
import { formatarMoeda } from "../../../utils/FormatarMoeda"
import Produto from "../../models/Produto"

interface CardProdutoProps {
	produto: Produto
}

function CardProduto({ produto }: Readonly<CardProdutoProps>) {
	const { isAuthenticated, isAdmin } = useAuth()

	return (
		<div className="flex flex-col rounded-lg overflow-hidden justify-between bg-white my-4 hover:shadow-lg shadow-md">
			{/* Ícones de ação */}
			<div className="flex justify-end items-center pt-2 pr-2">
				{isAuthenticated && isAdmin && (
					<>
						<Link to={`/editarproduto/${produto.id}`}>
							<PencilIcon size={24} className="mr-1 hover:fill-teal-700" />
						</Link>
						<Link to={`/deletarproduto/${produto.id}`}>
							<TrashIcon size={24} className="mr-1 hover:fill-red-700" />
						</Link>
					</>
				)}

				<button onClick={() => {}}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="48"
						height="48"
						fill="#ff0000"
						viewBox="0 0 256 256"
						className="h-6 w-6 fill-red-600 hover:fill-red-300"
					>
						<path d="M240,94c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,220.66,16,164,16,94A62.07,62.07,0,0,1,78,32c20.65,0,38.73,8.88,50,23.89C139.27,40.88,157.35,32,178,32A62.07,62.07,0,0,1,240,94Z"></path>
					</svg>
				</button>
				<p className="pl-1">00</p>
			</div>

			{/* Detalhes do produto */}
			<div className="flex flex-col justify-start items-center py-2 h-full">
				<div className="min-h-[40vh] flex justify-center items-center">
					<Link to={`/produtodetalhe/${produto.id}`}>
						{produto.foto ? (
							<img
								src={produto.foto}
								alt={produto.titulo}
								className="w-full h-full object-contain"
							/>
						) : (
							<div className="flex flex-col items-center p-4 text-center text-gray-400">
								<BookOpenIcon size={64} color="#99a1af" />
								<p>Imagem indisponível</p>
							</div>
						)}
					</Link>
				</div>
				<div className="p-4 min-h-[25vh] flex flex-col justify-between">
					<p className="py-2 text-sm text-center uppercase">{produto.titulo}</p>
					<h3 className="py-1 text-xl text-center font-bold uppercase">
						{formatarMoeda(produto.preco)}
					</h3>
				</div>
			</div>

			{/* Botão de compra */}
			<button
				className="w-full text-white text-lg bg-indigo-900 hover:bg-indigo-600 flex items-center justify-center py-2"
				onClick={() => {}}
			>
				<ShoppingCartIcon className="mx-2" size={28} weight="bold" />
				Comprar
			</button>
		</div>
	)
}

export default CardProduto

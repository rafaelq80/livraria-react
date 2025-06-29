import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { listar } from "../../services/AxiosService"
import { ErrorHandlerService } from "../../services/ErrorHandlerService"
import Button from "../../shared/components/ui/Button"
import Produto from "../models/Produto"
import { BookOpenIcon, ThumbsUpIcon, ShoppingCartIcon, TruckIcon, CreditCardIcon, ArrowsClockwiseIcon, InfoIcon, GiftIcon, BarcodeIcon, BuildingOfficeIcon, StarIcon, NumberSquareOneIcon, GlobeHemisphereWestIcon } from "@phosphor-icons/react"

interface ProdutoDetalheProps {
	onAddToCart?: () => void
	onCalcularFrete?: (cep: string) => void
}

function ProdutoDetalhe({ onAddToCart, onCalcularFrete }: Readonly<ProdutoDetalheProps>) {
	const [cep, setCep] = useState("")
	const [quantidade, setQuantidade] = useState(1)
	const [activeTab, setActiveTab] = useState("descricao")

	const [produto, setProduto] = useState<Produto>({} as Produto)

	const { id } = useParams<{ id: string }>()

	const fetchProdutoData = async () => {
		if (!id) return

		try {
			const resposta = await listar<Produto>(`/produtos/${id}`)
			setProduto(resposta)
		} catch (error) {
			ErrorHandlerService.handleError(error)
		}
	}

	useEffect(() => {
		fetchProdutoData()
	}, [id])

	// Cálculo do preço com desconto
	const precoOriginal = produto.preco
	const precoComDesconto =
		produto.desconto > 0
			? precoOriginal - (precoOriginal * produto.desconto) / 100
			: precoOriginal

	// Formatar o preço para exibição
	const formatarPreco = (valor: number) => {
		return new Intl.NumberFormat("pt-BR", {
			style: "currency",
			currency: "BRL",
		}).format(valor)
	}

	// Manipulador para alteração de quantidade
	const handleQuantidadeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value)
		setQuantidade(value > 0 ? value : 1)
	}

	// Manipulador para cálculo de frete
	const handleCalcularFrete = () => {
		if (onCalcularFrete && cep.length === 8) {
			onCalcularFrete(cep)
		}
	}

	return (
		<div className="py-8">
			<div className="container mx-auto bg-white rounded-lg shadow-lg p-4 md:p-6 lg:p-8 w-full max-w-7xl">
				<div className="flex flex-col lg:flex-row gap-8 mb-8">
					{/* Coluna da esquerda - Imagem do produto */}
					<div className="w-full lg:w-1/3">
						<div className="sticky top-8">
							<div className="relative">
								{produto.desconto > 0 && (
									<div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
										-{produto.desconto}%
									</div>
								)}
								<div className="h-96 w-full border border-gray-200 rounded-lg overflow-hidden flex items-center justify-center bg-gray-50">
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
								</div>
							</div>
						</div>
					</div>

					{/* Coluna da direita - Detalhes do produto */}
					<div className="w-full lg:w-2/3">
						{/* Informações do produto */}
						<div className="mb-6">
							<p className="text-gray-500 text-sm">
								{produto.categoria?.tipo} | ISBN-13: {produto.isbn13}
							</p>
							<h1 className="text-3xl font-bold text-gray-800 mb-2">
								{produto.titulo}
							</h1>
							<p className="text-gray-600 mb-2">
								<span className="font-semibold">Editora:</span>{" "}
								{produto.editora?.nome}
							</p>
							<p className="text-gray-600 mb-4">
								<span className="font-semibold">
									Autor{produto.autores?.length !== 1 ? "es" : ""}:
								</span>{" "}
								{produto.autores?.map((autor) => autor.nome).join(", ")}
							</p>

							{/* Curtidas em vez de Avaliação */}
							<div className="flex items-center gap-2 mb-6">
								<div className="flex">
									{[1, 2, 3, 4, 5].map((like) => (
										<ThumbsUpIcon
											key={like}
											size={20}
											className="text-blue-600"
											weight="fill"
										/>
									))}
								</div>
								<span className="text-gray-600 text-sm">(42 curtidas)</span>
							</div>

							{/* Preços */}
							<div className="mb-6">
								{produto.desconto > 0 ? (
									<>
										<p className="text-gray-500 line-through text-lg">
											{formatarPreco(precoOriginal)}
										</p>
										<p className="text-3xl font-bold text-indigo-900">
											{formatarPreco(precoComDesconto)}
										</p>
									</>
								) : (
									<p className="text-3xl font-bold text-indigo-900">
										{formatarPreco(precoOriginal)}
									</p>
								)}

								<p className="text-green-600 font-medium mt-1">
									Em até 12x sem juros
								</p>
							</div>

							{/* Quantidade e Carrinho */}
							<div className="flex flex-col md:flex-row gap-4 mb-8">
								<div className="flex items-center border border-gray-300 rounded w-full md:w-32">
									<button
										onClick={() => setQuantidade((q) => Math.max(1, q - 1))}
										className="flex-1 h-full px-3 py-2 text-gray-700 hover:bg-gray-100"
									>
										-
									</button>
									<input
										type="number"
										min="1"
										value={quantidade}
										onChange={handleQuantidadeChange}
										className="w-12 text-center border-0 focus:ring-0"
									/>
									<button
										onClick={() => setQuantidade((q) => q + 1)}
										className="flex-1 h-full px-3 py-2 text-gray-700 hover:bg-gray-100"
									>
										+
									</button>
								</div>

								<Button type="button" onClick={onAddToCart} size="full">
									<div className="flex items-center justify-center gap-2">
										<ShoppingCartIcon size={24} weight="bold" />
										Adicionar ao Carrinho
									</div>
								</Button>
							</div>

							{/* Cálculo de Frete */}
							<div className="bg-gray-50 rounded-lg p-4 mb-6">
								<div className="flex items-start gap-2 mb-3">
									<TruckIcon size={24} className="text-indigo-900" />
									<h3 className="font-semibold">Calcular Frete e Prazo</h3>
								</div>

								<div className="flex flex-col md:flex-row gap-3">
									<input
										type="text"
										placeholder="Digite seu CEP"
										value={cep}
										onChange={(e) =>
											setCep(e.target.value.replace(/\D/g, "").slice(0, 8))
										}
										className="flex-1 px-4 py-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
									/>
									<Button
										type="button"
										onClick={handleCalcularFrete}
										variant="outline"
									>
										Calcular
									</Button>
								</div>

								<p className="text-xs text-gray-500 mt-2">
									Não sabe seu CEP?{" "}
									<a
										href="https://buscacepinter.correios.com.br/app/endereco/index.php"
										target="_blank"
										rel="noopener noreferrer"
										className="text-indigo-600 hover:underline"
									>
										Consulte aqui
									</a>
								</p>
							</div>

							{/* Métodos de pagamento com ícones */}
							<div className="mb-6">
								<div className="flex items-center gap-2 mb-3">
									<CreditCardIcon size={24} className="text-indigo-900" />
									<h3 className="font-semibold">Formas de Pagamento</h3>
								</div>

								<div className="flex flex-wrap gap-2">
									<div className="p-2 border border-gray-200 rounded flex items-center justify-center h-10 w-16">
										<CreditCardIcon size={24} className="text-gray-700" />
									</div>
									<div className="p-2 border border-gray-200 rounded flex items-center justify-center h-10 w-16">
										<img
											src="https://ik.imagekit.io/vzr6ryejm/ecommerce/pix_icon_198027.svg?updatedAt=1745691967082"
											alt="pix"
											className="w-6 h-6"
										/>
									</div>
									<div className="p-2 border border-gray-200 rounded flex items-center justify-center h-10 w-16">
										<img
											src="https://ik.imagekit.io/vzr6ryejm/ecommerce/apple-pay-svgrepo-com.svg?updatedAt=1745692576642"
											alt="Apple Pay"
											className="h-10"
										/>
									</div>
									<div className="p-2 border border-gray-200 rounded flex items-center justify-center h-10 w-16">
										<img
											src="https://ik.imagekit.io/vzr6ryejm/ecommerce/google-pay-svgrepo-com.svg?updatedAt=1745692852391"
											alt="Google Pay"
											className="h-10"
										/>
									</div>
									<div className="p-2 border border-gray-200 rounded flex items-center justify-center h-10 w-16">
										<img
											src="https://ik.imagekit.io/vzr6ryejm/ecommerce/boleto-logo.svg?updatedAt=1745692852538"
											alt="Boleto"
											className="h-12"
										/>
									</div>
								</div>
							</div>

							{/* Benefícios */}
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
								<div className="flex items-center gap-2 text-gray-700">
									<ArrowsClockwiseIcon size={20} />
									<p className="text-sm">Troca grátis em até 7 dias</p>
								</div>
								<div className="flex items-center gap-2 text-gray-700">
									<TruckIcon size={20} />
									<p className="text-sm">Envio para todo o Brasil</p>
								</div>
								<div className="flex items-center gap-2 text-gray-700">
									<InfoIcon size={20} />
									<p className="text-sm">Estoque pronto para envio</p>
								</div>
								<div className="flex items-center gap-2 text-gray-700">
									<GiftIcon size={20} />
									<p className="text-sm">Embalagem para presente</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Abas de informações adicionais - Removida a guia de avaliações */}
				<div className="border-t border-gray-200 pt-8">
					<div className="flex border-b border-gray-200">
						<button
							className={`px-4 py-2 font-medium text-sm ${
								activeTab === "descricao"
									? "text-indigo-900 border-b-2 border-indigo-900"
									: "text-gray-500 hover:text-gray-700"
							}`}
							onClick={() => setActiveTab("descricao")}
						>
							Descrição
						</button>
						<button
							className={`px-4 py-2 font-medium text-sm ${
								activeTab === "detalhes"
									? "text-indigo-900 border-b-2 border-indigo-900"
									: "text-gray-500 hover:text-gray-700"
							}`}
							onClick={() => setActiveTab("detalhes")}
						>
							Detalhes do Produto
						</button>
					</div>

					<div className="py-6">
						{activeTab === "sinopse" && (
							<div>
								<h3 className="text-lg font-semibold mb-4">Sobre o livro</h3>
								<p className="text-gray-700 mb-4">{produto.sinopse}</p>
							</div>
						)}

						{activeTab === "detalhes" && (
							<div>
								<h3 className="text-lg font-semibold mb-4">
									Informações do produto
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
									<div>
										<p className="flex justify-between py-2 border-b border-gray-100">
											<div className="flex items-center gap-2">
												<BarcodeIcon size={20} />
												<span className="font-medium">ISBN-10:</span>
											</div>
											<span className="text-gray-600">{produto.isbn10}</span>
										</p>
										<p className="flex justify-between py-2 border-b border-gray-100">
											<div className="flex items-center gap-2">
												<BarcodeIcon size={20} />
												<span className="font-medium">ISBN-13:</span>
											</div>
											<span className="text-gray-600">{produto.isbn13}</span>
										</p>
										<p className="flex justify-between py-2 border-b border-gray-100">
											<div className="flex items-center gap-2">
												<BuildingOfficeIcon size={20} />
												<span className="font-medium">Editora:</span>
											</div>
											<span className="text-gray-600">
												{produto.editora?.nome}
											</span>
										</p>
									</div>
									<div>
										<p className="flex justify-between py-2 border-b border-gray-100">
											<div className="flex items-center gap-2">
												<StarIcon size={20} />
												<span className="font-medium">Categoria:</span>
											</div>
											<span className="text-gray-600">
												{produto.categoria?.tipo}
											</span>
										</p>
										<p className="flex justify-between py-2 border-b border-gray-100">
											<div className="flex items-center gap-2">
												<NumberSquareOneIcon size={20} />
												<span className="font-medium">Páginas:</span>
											</div>
											<span className="text-gray-600">{produto.paginas}</span>
										</p>
										<p className="flex justify-between py-2 border-b border-gray-100">
											<div className="flex items-center gap-2">
												<GlobeHemisphereWestIcon size={20} />
												<span className="font-medium">Idioma:</span>
											</div>
											<span className="text-gray-600">{produto.idioma}</span>
										</p>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProdutoDetalhe

import {
	ArrowLeftIcon,
	CreditCardIcon,
	CurrencyCircleDollarIcon,
	InfoIcon,
	MinusIcon,
	PlusIcon,
	ShoppingBagIcon,
	ShoppingCartIcon,
	TrashIcon,
	TruckIcon
} from "@phosphor-icons/react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Produto from "../produto/models/Produto"
import { listar } from "../services/AxiosService"
import { ErrorHandlerService } from "../services/ErrorHandlerService"
import Button from "../shared/components/ui/Button"

interface CartItem {
	produtoId: number
	produto: Produto
	quantidade: number
}

interface CarrinhoProps {
	onCheckout?: () => void
	onRemoveItem?: (id: number) => void
	onUpdateQuantity?: (id: number, quantidade: number) => void
}

function Carrinho({ onCheckout, onRemoveItem, onUpdateQuantity }: Readonly<CarrinhoProps>) {
	const [itensCarrinho, setItensCarrinho] = useState<CartItem[]>([])
	const [cupomDesconto, setCupomDesconto] = useState("")
	const [cep, setCep] = useState("")
	const [frete, setFrete] = useState(0)
	const [carregando, setCarregando] = useState(true)

	// Simula a obtenção dos itens do carrinho
	const fetchCartItems = async () => {
		setCarregando(true)
		try {
			// Em uma implementação real, você buscaria os itens do carrinho de uma API
			// Aqui estamos simulando com dados estáticos para demonstração
			const produtosIds = [9, 11] // IDs dos produtos no carrinho
			const produtosPromises = produtosIds.map((id) => listar<Produto>(`/produtos/${id}`))

			const produtosRespostas = await Promise.all(produtosPromises)

			// Processa cada resposta para garantir que seja um Produto válido
			const produtos: Produto[] = produtosRespostas
				.map((resposta: unknown) => {
					// Para produtos individuais, verificamos se é um objeto válido com id
					if (resposta && typeof resposta === 'object' && 'id' in resposta) {
						return resposta as Produto
					}
					// Se nenhuma estrutura válida for encontrada, retorna null
					else {
						console.warn("Estrutura de resposta inesperada para produto:", resposta)
						return null
					}
				})
				.filter((produto): produto is Produto => produto !== null) // Remove produtos nulos

			const itens: CartItem[] = produtos.map((produto, index) => ({
				produtoId: produto.id,
				produto,
				quantidade: index === 0 ? 2 : 1, // Simulando quantidades diferentes
			}))

			setItensCarrinho(itens)
		} catch (error) {
			console.error("Erro ao buscar itens do carrinho:", error)
			ErrorHandlerService.handleError(error)
			setItensCarrinho([]) // Garante que itensCarrinho seja um array vazio em caso de erro
		} finally {
			setCarregando(false)
		}
	}

	useEffect(() => {
		fetchCartItems()
	}, [])

	// Calcula preço com desconto para um produto
	const calcularPrecoComDesconto = (preco: number, desconto: number) => {
		return desconto > 0 ? preco - (preco * desconto) / 100 : preco
	}

	// Formatar o preço para exibição
	const formatarPreco = (valor: number) => {
		return new Intl.NumberFormat("pt-BR", {
			style: "currency",
			currency: "BRL",
		}).format(valor)
	}

	// Manipulador para alteração de quantidade
	const handleQuantidadeChange = (produtoId: number, novaQuantidade: number) => {
		if (novaQuantidade < 1) return

		setItensCarrinho((itens) =>
			itens.map((item) =>
				item.produtoId === produtoId ? { ...item, quantidade: novaQuantidade } : item
			)
		)

		if (onUpdateQuantity) {
			onUpdateQuantity(produtoId, novaQuantidade)
		}
	}

	// Manipulador para remoção de item
	const handleRemoveItem = (produtoId: number) => {
		setItensCarrinho((itens) => itens.filter((item) => item.produtoId !== produtoId))

		if (onRemoveItem) {
			onRemoveItem(produtoId)
		}
	}

	// Manipulador para cálculo de frete
	const handleCalcularFrete = () => {
		if (cep.length === 8) {
			// Simulação de cálculo de frete
			setFrete(15.9)
		}
	}

	// Cálculo dos totais
	const subtotal = itensCarrinho.reduce((total, item) => {
		const precoUnitario = calcularPrecoComDesconto(item.produto.preco, item.produto.desconto)
		return total + precoUnitario * item.quantidade
	}, 0)

	const descontoAplicado = 0 // Simulação - seria calculado com base no cupom
	const total = subtotal + frete - descontoAplicado

	// Renderização condicional para carrinho vazio
	if (carregando) {
		return (
			<div className="py-8">
				<div className="container mx-auto bg-white rounded-lg shadow-lg p-4 md:p-6 lg:p-8 w-full max-w-7xl flex justify-center items-center h-64">
					<p className="text-gray-500">Carregando seu carrinho...</p>
				</div>
			</div>
		)
	}

	if (itensCarrinho.length === 0) {
		return (
			<div className="py-8">
				<div className="container mx-auto bg-white rounded-lg shadow-lg p-4 md:p-6 lg:p-8 w-full max-w-7xl">
					<div className="flex flex-col items-center justify-center py-12">
						<ShoppingCartIcon size={64} className="text-gray-300 mb-4" />
						<h2 className="text-2xl font-bold text-gray-800 mb-2">
							Seu carrinho está vazio
						</h2>
						<p className="text-gray-600 mb-6">
							Adicione produtos ao seu carrinho para continuar comprando
						</p>
						<Link to="/produtos">
							<Button type="button" variant="primary">
								<div className="flex items-center justify-center gap-2">
									<ShoppingBagIcon size={24} weight="bold" />
									Continuar Comprando
								</div>
							</Button>
						</Link>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="py-8">
			<div className="container mx-auto bg-white rounded-lg shadow-lg p-4 md:p-6 lg:p-8 w-full max-w-7xl">
				<div className="flex items-center mb-6">
					<h1 className="text-2xl font-bold text-gray-800">Meu Carrinho</h1>
					<span className="ml-2 text-gray-600">
						({itensCarrinho.length} {itensCarrinho.length === 1 ? "item" : "itens"})
					</span>
				</div>

				<div className="flex flex-col lg:flex-row gap-8">
					{/* Coluna da esquerda - Lista de produtos */}
					<div className="w-full lg:w-2/3">
						<div className="border-b border-gray-200 pb-4 mb-4">
							<Link
								to="/produtos"
								className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
							>
								<ArrowLeftIcon size={16} />
								<span>Continuar comprando</span>
							</Link>
						</div>

						{/* Lista de itens do carrinho */}
						<div className="space-y-6">
							{itensCarrinho.map((item) => {
								const precoUnitario = calcularPrecoComDesconto(
									item.produto.preco,
									item.produto.desconto
								)

								return (
									<div
										key={item.produtoId}
										className="flex flex-col sm:flex-row gap-4 pb-6 border-b border-gray-200"
									>
										{/* Imagem do produto */}
										<div className="w-full sm:w-1/4">
											<div className="border border-gray-200 rounded-lg overflow-hidden h-40 flex items-center justify-center bg-gray-50">
												{item.produto.foto ? (
													<img
														src={item.produto.foto}
														alt={item.produto.titulo}
														className="w-full h-full object-contain"
													/>
												) : (
													<div className="flex flex-col items-center p-4 text-gray-400">
														<ShoppingBagIcon size={40} />
														<p className="text-sm">Sem imagem</p>
													</div>
												)}
											</div>
										</div>

										{/* Detalhes do produto */}
										<div className="flex-1">
											<div className="flex flex-col sm:flex-row justify-between mb-2">
												<div>
													<h3 className="text-lg font-medium text-gray-900">
														{item.produto.titulo}
													</h3>
													<p className="text-gray-600 text-sm">
														{item.produto.editora?.nome}
													</p>
												</div>
												<div className="flex items-start justify-end mt-2 sm:mt-0">
													{item.produto.desconto > 0 ? (
														<div className="text-right">
															<p className="text-gray-500 line-through text-sm">
																{formatarPreco(item.produto.preco)}
															</p>
															<p className="text-lg font-bold text-indigo-900">
																{formatarPreco(precoUnitario)}
															</p>
														</div>
													) : (
														<p className="text-lg font-bold text-indigo-900">
															{formatarPreco(precoUnitario)}
														</p>
													)}
												</div>
											</div>

											<div className="flex flex-wrap justify-between items-end mt-4">
												<div className="flex items-center mb-2 sm:mb-0">
													<button
														onClick={() =>
															handleQuantidadeChange(
																item.produtoId,
																item.quantidade - 1
															)
														}
														className="p-1 rounded hover:bg-gray-100"
													>
														<MinusIcon size={20} />
													</button>
													<input
														type="number"
														min="1"
														value={item.quantidade}
														onChange={(e) =>
															handleQuantidadeChange(
																item.produtoId,
																parseInt(e.target.value) || 1
															)
														}
														className="w-12 text-center border border-gray-300 rounded mx-2 py-1"
													/>
													<button
														onClick={() =>
															handleQuantidadeChange(
																item.produtoId,
																item.quantidade + 1
															)
														}
														className="p-1 rounded hover:bg-gray-100"
													>
														<PlusIcon size={20} />
													</button>
												</div>

												<div className="flex items-center">
													<button
														onClick={() =>
															handleRemoveItem(item.produtoId)
														}
														className="flex items-center text-gray-500 hover:text-red-600"
													>
														<TrashIcon size={20} className="mr-1" />
														<span>Remover</span>
													</button>
												</div>
											</div>
										</div>
									</div>
								)
							})}
						</div>
					</div>

					{/* Coluna da direita - Resumo e checkout */}
					<div className="w-full lg:w-1/3">
						<div className="bg-gray-50 rounded-lg p-6 sticky top-8">
							<h2 className="text-xl font-bold text-gray-800 mb-4">
								Resumo do Pedido
							</h2>

							{/* Cupom de desconto */}
							<div className="border-b border-gray-200 pb-4 mb-4">
								<div className="flex items-center gap-2 mb-3">
									<CurrencyCircleDollarIcon size={24} className="text-indigo-900" />
									<h3 className="font-semibold">Cupom de Desconto</h3>
								</div>

								<div className="flex gap-2">
									<input
										type="text"
										placeholder="Digite seu cupom"
										value={cupomDesconto}
										onChange={(e) => setCupomDesconto(e.target.value)}
										className="flex-1 px-3 py-2 border border-gray-300 rounded"
									/>
									<Button type="button" variant="outline">
										Aplicar
									</Button>
								</div>
							</div>

							{/* Cálculo de Frete */}
							<div className="border-b border-gray-200 pb-4 mb-4">
								<div className="flex items-center gap-2 mb-3">
									<TruckIcon size={24} className="text-indigo-900" />
									<h3 className="font-semibold">Calcular Frete</h3>
								</div>

								<div className="flex flex-col gap-3">
									<div className="flex gap-2">
										<input
											type="text"
											placeholder="Digite seu CEP"
											value={cep}
											onChange={(e) =>
												setCep(
													e.target.value.replace(/\D/g, "").slice(0, 8)
												)
											}
											className="flex-1 px-3 py-2 border border-gray-300 rounded"
										/>
										<Button
											type="button"
											onClick={handleCalcularFrete}
											variant="outline"
										>
											OK
										</Button>
									</div>

									{frete > 0 && (
										<div className="bg-white p-3 rounded border border-gray-200">
											<div className="flex justify-between items-center">
												<div>
													<p className="font-medium">Entrega padrão</p>
													<p className="text-sm text-gray-600">
														Até 7 dias úteis
													</p>
												</div>
												<p className="font-medium">
													{formatarPreco(frete)}
												</p>
											</div>
										</div>
									)}

									<p className="text-xs text-gray-500">
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
							</div>

							{/* Resumo dos Valores */}
							<div className="border-b border-gray-200 pb-4 mb-4">
								<div className="space-y-2">
									<div className="flex justify-between">
										<span className="text-gray-600">Subtotal</span>
										<span className="font-medium">
											{formatarPreco(subtotal)}
										</span>
									</div>

									{frete > 0 && (
										<div className="flex justify-between">
											<span className="text-gray-600">Frete</span>
											<span className="font-medium">
												{formatarPreco(frete)}
											</span>
										</div>
									)}

									{descontoAplicado > 0 && (
										<div className="flex justify-between text-green-600">
											<span>Desconto</span>
											<span>-{formatarPreco(descontoAplicado)}</span>
										</div>
									)}
								</div>
							</div>

							{/* Total */}
							<div className="flex justify-between items-center mb-6">
								<span className="text-lg font-bold">Total</span>
								<span className="text-xl font-bold text-indigo-900">
									{formatarPreco(total)}
								</span>
							</div>

							{/* Botão de checkout */}
							<Button type="button" onClick={onCheckout} size="full">
								Finalizar Compra
							</Button>

							{/* Formas de pagamento */}
							<div className="mt-6">
								<div className="flex items-center gap-2 mb-3">
									<CreditCardIcon size={20} className="text-indigo-900" />
									<h3 className="text-sm font-semibold">Formas de Pagamento</h3>
								</div>

								<div className="flex flex-wrap gap-2">
									<div className="p-2 border border-gray-200 rounded flex items-center justify-center h-8 w-12">
										<CreditCardIcon size={16} className="text-gray-700" />
									</div>
									<div className="p-2 border border-gray-200 rounded flex items-center justify-center h-8 w-12">
										<img
											src="https://ik.imagekit.io/vzr6ryejm/ecommerce/pix_icon_198027.svg?updatedAt=1745691967082"
											alt="pix"
											className="w-4 h-4"
										/>
									</div>
									<div className="p-2 border border-gray-200 rounded flex items-center justify-center h-8 w-12">
										<img
											src="https://ik.imagekit.io/vzr6ryejm/ecommerce/apple-pay-svgrepo-com.svg?updatedAt=1745692576642"
											alt="Apple Pay"
											className="h-10"
										/>
									</div>
									<div className="p-2 border border-gray-200 rounded flex items-center justify-center h-8 w-12">
										<img
											src="https://ik.imagekit.io/vzr6ryejm/ecommerce/google-pay-svgrepo-com.svg?updatedAt=1745692852391"
											alt="Google Pay"
											className="h-10"
										/>
									</div>
									<div className="p-2 border border-gray-200 rounded flex items-center justify-center h-8 w-12">
										<img
											src="https://ik.imagekit.io/vzr6ryejm/ecommerce/boleto-logo.svg?updatedAt=1745692852538"
											alt="Boleto"
											className="h-12"
										/>
									</div>
								</div>
							</div>

							{/* Informações adicionais */}
							<div className="mt-4 text-sm text-gray-600 flex items-start gap-2">
								<InfoIcon size={16} className="text-gray-500 flex-shrink-0 mt-0.5" />
								<p>
									Os preços e disponibilidade dos produtos estão sujeitos a
									alteração sem aviso prévio.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Carrinho

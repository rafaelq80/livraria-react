import { ReactNode, memo, useCallback } from "react"
import Popup from "reactjs-popup"
import "reactjs-popup/dist/index.css"
import Button from "../ui/Button"

/**
 * Interface que define as propriedades do modal de confirmação de exclusão
 */
interface DeleteConfirmationModalProps {
	/** Indica se o modal está aberto */
	isOpen: boolean
	/** Função chamada para fechar o modal */
	onClose: () => void
	/** Função chamada quando a exclusão é confirmada */
	onConfirm: () => void
	/** Título do modal */
	title: string
	/** Nome do item a ser excluído (usado na mensagem padrão) */
	itemName?: string
	/** Mensagem customizada (substitui a mensagem padrão) */
	message?: ReactNode
	/** Texto do botão de confirmação */
	confirmButtonText?: string
	/** Texto do botão de cancelamento */
	cancelButtonText?: string
	/** Indica se está processando a exclusão */
	isLoading?: boolean
	/** Elemento que dispara a abertura do modal */
	trigger?: ReactNode
}

// Estilos externalizados para evitar recriações em cada renderização
// Melhora a performance evitando recálculos desnecessários
const overlayStyle = {
	backgroundColor: "rgba(0, 0, 0, 0.6)",
	backdropFilter: "blur(2px)",
	zIndex: 1000,
}

const contentStyle = {
	background: "transparent",
	border: "none",
	width: "auto",
	padding: 0,
	margin: "auto",
	borderRadius: 0,
	boxShadow: "none",
	position: "relative" as const,
	zIndex: 1001,
}

const arrowStyle = { display: "none" }

/**
 * Modal de confirmação de exclusão com funcionalidades de:
 * - Confirmação antes de excluir itens
 * - Mensagens customizáveis
 * - Estado de carregamento
 * - Animações suaves
 * - Acessibilidade
 * - Otimização de performance com memo
 */
const DeleteConfirmationModal = memo(
	({
		isOpen,
		onClose,
		onConfirm,
		title,
		itemName,
		message,
		confirmButtonText = "Excluir",
		cancelButtonText = "Cancelar",
		isLoading = false,
		trigger,
	}: DeleteConfirmationModalProps) => {
		
		/**
		 * Manipula a confirmação da exclusão
		 * Usa useCallback para otimizar re-renderizações
		 */
		const handleConfirm = useCallback(() => {
			onConfirm()
		}, [onConfirm])

		// Cria a mensagem padrão se itemName for fornecido e message não for
		// Fornece uma experiência consistente com o nome do item
		const defaultMessage = itemName ? (
			<p className="text-gray-700">
				Tem certeza que deseja excluir {itemName}? <span className="font-semibold block mt-2 text-red-600">
					Esta ação não pode ser desfeita.
				</span>
			</p>
		) : (
			<p className="text-gray-700">
				Tem certeza que deseja excluir este item? <span className="font-semibold block mt-2 text-red-600">
					Esta ação não pode ser desfeita.
				</span>
			</p>
		)

		// Usa a mensagem customizada se fornecida, senão usa a padrão
		const displayMessage = message || defaultMessage

		return (
			<Popup
				open={isOpen}
				closeOnDocumentClick
				onClose={onClose}
				trigger={trigger}
				modal
				nested
				className="delete-confirmation-modal"
				overlayStyle={overlayStyle}
				contentStyle={contentStyle}
				arrowStyle={arrowStyle}
			>
				{/* Container principal do modal */}
				<div className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-auto animate-fadeIn">
					{/* Cabeçalho com título e botão de fechar */}
					<div className="flex justify-between items-center mb-4 border-b pb-2">
						<h3 className="text-lg font-semibold text-gray-800">{title}</h3>
						<button
							className="text-gray-500 hover:text-gray-700 text-xl font-bold focus:outline-none"
							onClick={onClose}
							aria-label="Fechar"
							type="button"
						>
							&times;
						</button>
					</div>
					
					{/* Área da mensagem */}
					<div className="mb-6 text-gray-600">{displayMessage}</div>
					
					{/* Área dos botões de ação */}
					<div className="flex justify-end space-x-3">
						{/* Botão de cancelamento */}
						<Button
							variant="secondary"
							size="md"
							onClick={onClose}
							disabled={isLoading}
							type="button"
						>
							{cancelButtonText}
						</Button>
						
						{/* Botão de confirmação */}
						<Button
							variant="danger"
							size="md"
							isLoading={isLoading}
							onClick={handleConfirm}
							disabled={isLoading}
							type="button"
						>
							{confirmButtonText}
						</Button>
					</div>
				</div>
			</Popup>
		)
	},
	(prevProps, nextProps) => {
		// Implementação de comparação personalizada para o memo
		// Otimiza re-renderizações comparando apenas props relevantes
		return (
			prevProps.isOpen === nextProps.isOpen &&
			prevProps.isLoading === nextProps.isLoading &&
			prevProps.title === nextProps.title &&
			prevProps.message === nextProps.message &&
			prevProps.itemName === nextProps.itemName
		)
	}
)

export default DeleteConfirmationModal

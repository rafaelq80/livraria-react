import { ReactNode, memo, useCallback } from "react"
import Popup from "reactjs-popup"
import "reactjs-popup/dist/index.css"
import Button from "../ui/Button"
import { QuestionIcon, XIcon } from "@phosphor-icons/react"

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
	backgroundColor: "rgba(0, 0, 0, 0.4)",
	backdropFilter: "blur(4px)",
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
const DeleteModal = memo(
	({
		isOpen,
		onClose,
		onConfirm,
		title,
		itemName,
		// message,
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
		// (Removido: defaultMessage não é mais usado)

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
				<div
					role="dialog"
					aria-modal="true"
					aria-labelledby="delete-modal-title"
					className="bg-white rounded-xl shadow-2xl p-6 max-w-md mx-auto w-11/12 transform transition-all duration-300 ease-in-out"
				>
					{/* Cabeçalho com título e botão de fechar */}
					<div className="flex justify-between items-center mb-6">
						<h3 id="delete-modal-title" className="text-xl font-semibold text-gray-800 flex items-center gap-2">
							{title}
						</h3>
						<button
							className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
							onClick={onClose}
							aria-label="Fechar"
							type="button"
						>
							<XIcon size={20} weight="bold" />
						</button>
					</div>
					
					{/* Área da mensagem */}
					<div className="mb-8">
						{itemName ? (
							<div className="space-y-3">
								<p className="text-gray-700 flex items-center gap-3">
									<QuestionIcon size={44} className="text-indigo-600 shrink-0" weight="fill" />
									<span>
										Tem certeza que deseja excluir <span className="font-medium">{itemName}</span>?
									</span>
								</p>
								<p role="alert" className="text-sm text-red-600 bg-red-50 p-2 rounded-md border border-red-100">
									Esta ação não pode ser desfeita.
								</p>
							</div>
						) : (
							<div className="space-y-3">
								<p className="text-gray-700 flex items-center gap-3">
									<QuestionIcon size={28} className="text-indigo-600 shrink-0" weight="fill" />
									<span>Tem certeza que deseja excluir este item?</span>
								</p>
								<p role="alert" className="text-sm text-red-600 bg-red-50 p-2 rounded-md border border-red-100">
									Esta ação não pode ser desfeita.
								</p>
							</div>
						)}
					</div>
					
					{/* Área dos botões de ação */}
					<div className="flex justify-end gap-3">
						{/* Botão de cancelamento */}
						<Button
							variant="outline"
							size="md"
							onClick={onClose}
							disabled={isLoading}
							type="button"
							className="min-w-[100px]"
							aria-label={cancelButtonText || "Cancelar"}
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
							className="min-w-[100px]"
							aria-label={confirmButtonText || "Excluir"}
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

export default DeleteModal

import { ReactNode, memo, useCallback } from "react"
import Popup from "reactjs-popup"
import "reactjs-popup/dist/index.css"

interface DeleteConfirmationModalProps {
	isOpen: boolean
	onClose: () => void
	onConfirm: () => void
	title: string
	itemName?: string
	message?: ReactNode
	confirmButtonText?: string
	cancelButtonText?: string
	isLoading?: boolean
	trigger?: ReactNode
}

// Estilos externalizados para evitar recriações em cada renderização
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
		const handleConfirm = useCallback(() => {
			onConfirm()
		}, [onConfirm])

		// Cria a mensagem padrão se itemName for fornecido e message não for
		const defaultMessage = itemName ? (
			<p className="text-gray-700">
				Tem certeza que deseja excluir {itemName}?
				<span className="font-semibold block mt-2 text-red-600">
					Esta ação não pode ser desfeita.
				</span>
			</p>
		) : (
			<p className="text-gray-700">
				Tem certeza que deseja excluir este item?
				<span className="font-semibold block mt-2 text-red-600">
					Esta ação não pode ser desfeita.
				</span>
			</p>
		)

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
				<div className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-auto animate-fadeIn">
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
					<div className="mb-6 text-gray-600">{displayMessage}</div>
					<div className="flex justify-end space-x-3">
						<button
							className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition duration-200 disabled:opacity-50"
							onClick={onClose}
							disabled={isLoading}
							type="button"
						>
							{cancelButtonText}
						</button>
						<button
							className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition duration-200 disabled:opacity-50"
							onClick={handleConfirm}
							disabled={isLoading}
							type="button"
						>
							{isLoading ? "Processando..." : confirmButtonText}
						</button>
					</div>
				</div>
			</Popup>
		)
	},
	(prevProps, nextProps) => {
		// Implementação de comparação personalizada para o memo
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

import Popup from "reactjs-popup"
import WebcamCapture from "../webcamcapture/WebCamCapture"

/**
 * Interface que define as propriedades do modal de webcam
 */
interface WebCamModalProps {
	/** Indica se o modal da câmera está aberto */
	openCamera: boolean
	/** Função para controlar a abertura/fechamento do modal */
	setOpenCamera: (open: boolean) => void
	/** Função chamada quando uma foto é capturada */
	capturePhoto: (photo: string) => void
}

/**
 * Modal que contém o componente de captura de webcam
 * Funcionalidades:
 * - Modal responsivo com overlay
 * - Integração com componente WebcamCapture
 * - Controle de abertura/fechamento
 * - Interface limpa e intuitiva
 */
const WebCamModal = ({ openCamera, setOpenCamera, capturePhoto }: WebCamModalProps) => {
	return (
		<Popup 
			open={openCamera} 
			onClose={() => setOpenCamera(false)} 
			modal 
			closeOnDocumentClick
		>
			{/* Container principal do modal */}
			<div className="modal p-4 bg-white rounded-lg shadow-lg">
				{/* Cabeçalho do modal com título e botão de fechar */}
				<div className="header mb-4 flex justify-between items-center">
					<h3 className="text-lg font-semibold">Capturar Foto</h3>
					<button
						onClick={() => setOpenCamera(false)}
						className="text-gray-500 hover:text-gray-700"
						aria-label="Fechar modal"
					>
						&times;
					</button>
				</div>
				
				{/* Conteúdo do modal - componente de captura */}
				<div className="content">
					<WebcamCapture onCapture={capturePhoto} />
				</div>
			</div>
		</Popup>
	)
}

export default WebCamModal

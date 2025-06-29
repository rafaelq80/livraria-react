import { useCallback, useRef, useState } from "react"
import Webcam from "react-webcam"

/**
 * Interface que define as propriedades do componente de captura de webcam
 */
interface WebcamCaptureProps {
	/** Função chamada quando uma foto é capturada */
	onCapture: (imageSrc: string) => void
}

/**
 * Componente de captura de fotos via webcam com funcionalidades de:
 * - Captura de fotos em tempo real
 * - Alternância entre câmera frontal e traseira
 * - Configurações de vídeo personalizáveis
 * - Interface responsiva e intuitiva
 * - Formato de imagem JPEG
 */
const WebcamCapture = ({ onCapture }: WebcamCaptureProps) => {
	// Referência para acessar a API da webcam
	const webcamRef = useRef<Webcam>(null)
	
	// Estado para controlar qual câmera está ativa (frontal ou traseira)
	const [facingMode, setFacingMode] = useState<"user" | "environment">("user")

	// Configurações de vídeo para a webcam
	const videoConstraints = {
		width: 720, // Largura da resolução de vídeo
		height: 480, // Altura da resolução de vídeo
		facingMode: facingMode, // Câmera ativa (frontal ou traseira)
	}

	/**
	 * Captura uma foto da webcam
	 * Gera uma imagem em formato base64 e chama a função onCapture
	 */
	const capture = useCallback(() => {
		if (webcamRef.current) {
			const imageSrc = webcamRef.current.getScreenshot()
			if (imageSrc) {
				onCapture(imageSrc)
			}
		}
	}, [webcamRef, onCapture])

	/**
	 * Alterna entre câmera frontal e traseira
	 * Muda o estado facingMode entre "user" (frontal) e "environment" (traseira)
	 */
	const switchCamera = () => {
		setFacingMode((prevMode) => (prevMode === "user" ? "environment" : "user"))
	}

	return (
		<div className="flex flex-col items-center">
			{/* Componente da webcam */}
			<Webcam
				audio={false} // Desabilita áudio
				ref={webcamRef} // Referência para acessar a API
				screenshotFormat="image/jpeg" // Formato da imagem capturada
				videoConstraints={videoConstraints} // Configurações de vídeo
				className="rounded-lg mb-4 w-full max-w-md" // Estilização responsiva
			/>
			
			{/* Botões de controle */}
			<div className="flex justify-center gap-4">
				{/* Botão para capturar foto */}
				<button
					onClick={capture}
					className="px-6 py-2 bg-indigo-900 text-white rounded hover:bg-indigo-700 transition"
				>
					Capturar Foto
				</button>
				
				{/* Botão para alternar câmera */}
				<button
					onClick={switchCamera}
					className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition"
				>
					Alternar Câmera
				</button>
			</div>
		</div>
	)
}

export default WebcamCapture

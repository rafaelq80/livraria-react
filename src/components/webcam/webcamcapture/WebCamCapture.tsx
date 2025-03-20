import { useCallback, useRef, useState } from "react"
import Webcam from "react-webcam"

interface WebcamCaptureProps {
	onCapture: (imageSrc: string) => void
}

const WebcamCapture = ({ onCapture }: WebcamCaptureProps) => {
	const webcamRef = useRef<Webcam>(null)
	const [facingMode, setFacingMode] = useState<"user" | "environment">("user")

	const videoConstraints = {
		width: 720,
		height: 480,
		facingMode: facingMode,
	}

	const capture = useCallback(() => {
		if (webcamRef.current) {
			const imageSrc = webcamRef.current.getScreenshot()
			if (imageSrc) {
				onCapture(imageSrc)
			}
		}
	}, [webcamRef, onCapture])

	const switchCamera = () => {
		setFacingMode((prevMode) => (prevMode === "user" ? "environment" : "user"))
	}

	return (
		<div className="flex flex-col items-center">
			<Webcam
				audio={false}
				ref={webcamRef}
				screenshotFormat="image/jpeg"
				videoConstraints={videoConstraints}
				className="rounded-lg mb-4 w-full max-w-md"
			/>
			<div className="flex justify-center gap-4">
				<button
					onClick={capture}
					className="px-6 py-2 bg-indigo-900 text-white rounded hover:bg-indigo-700 transition"
				>
					Capturar Foto
				</button>
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

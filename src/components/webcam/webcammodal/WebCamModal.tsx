import Popup from "reactjs-popup"
import WebcamCapture from "../../../components/webcam/webcamcapture/WebCamCapture"

interface WebCamModalProps {
	openCamera: boolean
	setOpenCamera: (open: boolean) => void
	capturePhoto: (photo: string) => void
}

const WebCamModal = ({ openCamera, setOpenCamera, capturePhoto }: WebCamModalProps) => {
	return (
		<Popup open={openCamera} onClose={() => setOpenCamera(false)} modal closeOnDocumentClick>
			<div className="modal p-4 bg-white rounded-lg shadow-lg">
				<div className="header mb-4 flex justify-between items-center">
					<h3 className="text-lg font-semibold">Capturar Foto</h3>
					<button
						onClick={() => setOpenCamera(false)}
						className="text-gray-500 hover:text-gray-700"
					>
						&times;
					</button>
				</div>
				<div className="content">
					<WebcamCapture onCapture={capturePhoto} />
				</div>
			</div>
		</Popup>
	)
}

export default WebCamModal

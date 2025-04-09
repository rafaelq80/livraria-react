import { Camera, UploadSimple, UserFocus } from "@phosphor-icons/react"
import { Control, Controller, Path, UseFormSetValue } from "react-hook-form"
import { useCampoFoto } from "../../hooks/campofoto/useCampoFoto"
import { WithFotoFile } from "../../types/CampoFotoTypes"
import WebCamModal from "../webcam/webcammodal/WebCamModal"

// Interface simplificada com props separadas claramente entre obrigatórias e opcionais
interface CampoFotoProps<T extends WithFotoFile> {
	// Props obrigatórias
	control: Control<T>
	setValue: UseFormSetValue<T>
	photoFieldName: Path<T>

	// Props opcionais com valores padrão
	initialPreview?: string
	className?: string
	camera?: boolean
	square?: boolean
	label?: string
}

export function CampoFoto<T extends WithFotoFile>({
	control,
	setValue,
	photoFieldName,
	initialPreview = "",
	className = "",
	camera = true,
	square = false,
	label,
}: CampoFotoProps<T>) {
	const {
		photoPreview,
		setPhotoPreview,
		openCamera,
		setOpenCamera,
		fileInputRef,
		handleFileChange,
		handleFileSelect,
		capturePhoto,
	} = useCampoFoto<T>({
		setValue,
		photoFieldName, // Passando o nome do campo diretamente para o hook
		initialPreview,
	})

	// Componentes extraídos para melhorar legibilidade
	const PhotoPreviewComponent = () => (
		<div className="flex justify-center mb-4">
			<div
				className={`w-52 ${!square ? "rounded-full h-52" : "h-68 aspect-square"} 
          border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden`}
			>
				{photoPreview ? (
					<img
						src={photoPreview}
						alt={label || "Preview da foto"}
						className={`w-full h-full object-cover ${!square ? "rounded-full" : ""}`}
						onError={() => setPhotoPreview("")}
					/>
				) : (
					<div className="flex flex-col items-center p-4 text-center text-gray-400">
						<UserFocus size={64} color="#99a1af" />
						<p>{label || "Foto"}</p>
					</div>
				)}
			</div>
		</div>
	)

	return (
		<div className={`w-full h-full flex flex-col items-center justify-center ${className}`}>
			<PhotoPreviewComponent />

			<div className="flex justify-center gap-4 mb-4">
				<Controller
					name={photoFieldName}
					control={control}
					render={({ field }) => (
						<>
							{/* Botão Upload */}
							<button
								type="button"
								onClick={handleFileSelect}
								className="flex items-center justify-center gap-2 px-8 py-2 text-white transition bg-indigo-900 rounded hover:bg-indigo-700"
								aria-label="Fazer upload de imagem"
							>
								<UploadSimple size={24} color="#ffffff" />
							</button>

							{/* Input de arquivo escondido */}
							<input
								id="fotoUpload"
								type="file"
								accept="image/*"
								className="hidden"
								onChange={(e) => {
									field.onChange(e)
									handleFileChange(e)
								}}
								ref={(e) => {
									field.ref(e)
									if (e !== null) {
										fileInputRef.current = e
									}
								}}
							/>

							{/* Botão de câmera condicional */}
							{camera && (
								<button
									type="button"
									onClick={() => setOpenCamera(true)}
									className="flex items-center justify-center gap-2 px-8 py-2 text-white transition bg-green-600 rounded hover:bg-green-500"
									aria-label="Tirar foto com a câmera"
								>
									<Camera size={24} color="#ffffff" />
								</button>
							)}
						</>
					)}
				/>
			</div>

			{/* Modal da câmera */}
			<WebCamModal
				openCamera={openCamera}
				setOpenCamera={setOpenCamera}
				capturePhoto={capturePhoto}
			/>
		</div>
	)
}

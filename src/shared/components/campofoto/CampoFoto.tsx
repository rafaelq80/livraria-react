import { CameraIcon, UploadSimpleIcon } from "@phosphor-icons/react"
import { Control, Controller, Path, UseFormSetValue } from "react-hook-form"
import { useCampoFoto } from "../../hooks/campofoto/useCampoFoto"
import { WithFotoFile } from "../../types/CampoFotoTypes"
import WebCamModal from "../webcam/webcammodal/WebCamModal"
import { FileInfo } from "./FileInfo"
import { PhotoPreview } from "./PhotoPreview"
import Button from "../ui/Button"

/**
 * Interface que define as propriedades do componente de campo de foto
 * Estende WithFotoFile para garantir compatibilidade com formulários
 */
interface CampoFotoProps<T extends WithFotoFile> {
	// Props obrigatórias
	/** Controle do react-hook-form */
	control: Control<T>
	/** Função para atualizar valores do formulário */
	setValue: UseFormSetValue<T>
	/** Nome do campo de foto no formulário */
	photoFieldName: Path<T>

	// Props opcionais com valores padrão
	/** URL da imagem de preview inicial */
	initialPreview?: string
	/** Classes CSS customizadas */
	className?: string
	/** Habilita funcionalidade de câmera */
	camera?: boolean
	/** Força formato quadrado para a imagem */
	square?: boolean
	/** Rótulo do campo */
	label?: string
	/** Tipos de arquivo permitidos */
	allowedTypes?: string[]
	/** Tamanho máximo do arquivo em bytes */
	maxFileSize?: number
	/** Exibe informações sobre tipos e tamanhos permitidos */
	showFileInfo?: boolean
}

/**
 * Componente de campo de foto com funcionalidades de:
 * - Upload de arquivos de imagem
 * - Captura de fotos via webcam
 * - Preview da imagem selecionada
 * - Validação de tipos e tamanhos de arquivo
 * - Integração com react-hook-form
 * - Interface responsiva e acessível
 * - Suporte a formato quadrado ou livre
 */
export function CampoFoto<T extends WithFotoFile>({
	control,
	setValue,
	photoFieldName,
	initialPreview = "",
	className = "",
	camera = true,
	square = false,
	label,
	allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"],
	maxFileSize = 5 * 1024 * 1024, // 5MB padrão
	showFileInfo = true,
}: Readonly<CampoFotoProps<T>>) {
	// Hook customizado que gerencia toda a lógica do campo de foto
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
		photoFieldName,
		initialPreview,
	})

	return (
		<div className={`w-full h-full flex flex-col items-center justify-center ${className}`}>
			{/* Componente de preview da foto */}
			<PhotoPreview 
				photoPreview={photoPreview}
				label={label}
				square={square}
				setPhotoPreview={setPhotoPreview}
			/>
			
			{/* Informações sobre tipos e tamanhos de arquivo permitidos */}
			<FileInfo 
				showFileInfo={showFileInfo}
				allowedTypes={allowedTypes}
				maxFileSize={maxFileSize}
			/>

			{/* Área de botões de ação */}
			<div className="flex justify-center gap-4 mb-4">
				{/* Controller do react-hook-form para integração */}
				<Controller
					name={photoFieldName}
					control={control}
					render={({ field }) => (
						<>
							{/* Botão para upload de arquivo */}
							<Button
								type="button"
								variant="primary"
								size="md"
								leftIcon={<UploadSimpleIcon size={24} color="#ffffff" />}
								onClick={handleFileSelect}
								aria-label="Fazer upload de imagem"
							>
								Upload
							</Button>

							{/* Input de arquivo oculto */}
							<input
								id="fotoUpload"
								type="file"
								accept={allowedTypes.join(',')}
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

							{/* Botão para captura via câmera (condicional) */}
							{camera && (
								<Button
									type="button"
									variant="success"
									size="md"
									leftIcon={<CameraIcon size={24} color="#ffffff" />}
									onClick={() => setOpenCamera(true)}
									aria-label="Tirar foto com a câmera"
								>
									Câmera
								</Button>
							)}
						</>
					)}
				/>
			</div>

			{/* Modal de captura via webcam */}
			<WebCamModal
				openCamera={openCamera}
				setOpenCamera={setOpenCamera}
				capturePhoto={capturePhoto}
			/>
		</div>
	)
}
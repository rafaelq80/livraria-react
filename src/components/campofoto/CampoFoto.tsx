import { Camera, UploadSimple, UserFocus } from "@phosphor-icons/react"
import { Control, Controller, Path, UseFormSetValue } from "react-hook-form"
import { useCampoFoto } from "../../hooks/campofoto/useCampoFoto"
import { WithFotoFile } from "../../types/CampoFotoTypes"
import WebCamModal from "../webcam/webcammodal/WebCamModal"

interface CampoFotoProps<T extends WithFotoFile> {
	control: Control<T>
	setValue: UseFormSetValue<T>
	photoFieldName: Path<T>
	label?: string
	initialPreview?: string
	className?: string,
    camera?: boolean,
    square?: boolean,
}

export function CampoFoto<T extends WithFotoFile>({
	control,
	setValue,
	photoFieldName,
	initialPreview = "",
    camera = true,
    square = false,
}: CampoFotoProps<T>) {
	const {
		photoPreview,
		setPhotoPreview,
		openCamera,
		setOpenCamera,
		fileInputRef,
		cameraInputRef,
		handleFileChange,
		handleFileSelect,
		capturePhoto,
	} = useCampoFoto<T>({
		setValue,
		initialPreview,
	})

	return (
		<div className="w-full h-full flex flex-col items-center justify-center">
			
				<div className="flex justify-center mb-4">
					<div className={`w-52 aspect-square ${!square ? 'rounded-full h-52' : 'h-68'} border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden`}>
						{photoPreview ? (
							<img
								src={photoPreview}
								alt="Preview da foto"
								className={`w-full h-full object-cover ${!square ? 'rounded-full' : ''}`}
								onError={() => setPhotoPreview("")}
							/>
						) : (
							<div className="text-gray-400 text-center p-4">
								<UserFocus size={64} color="#99a1af" />
								<p>Foto</p>
							</div>
						)}
					</div>
				</div>

				<div className="mb-4 flex gap-4 justify-center">
					<Controller
						name={photoFieldName}
						control={control}
						render={({ field }) => (
							<>
								<button
									type="button"
									onClick={handleFileSelect}
									className="px-8 py-2 bg-indigo-900 text-white rounded hover:bg-indigo-700 transition flex items-center justify-center gap-2"
								>
									<UploadSimple size={24} color="#ffffff" />
								</button>
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
										if (fileInputRef.current !== e && e !== null) {
											fileInputRef.current = e
										}
									}}
								/>

								{ camera && (<button
									type="button"
									onClick={() => setOpenCamera(true)}
									className="px-8 py-2 bg-green-600 text-white rounded hover:bg-green-500 transition flex items-center justify-center gap-2"
								>
									<Camera size={24} color="#ffffff" />
								</button>
                                )}
								<input
									id="fotoCamera"
									type="file"
									accept="image/*"
									capture="environment"
									className="hidden"
									onChange={(e) => {
										field.onChange(e)
										handleFileChange(e)
									}}
									ref={(e) => {
										field.ref(e)
										if (cameraInputRef.current !== e && e !== null) {
											cameraInputRef.current = e
										}
									}}
								/>
							</>
						)}
					/>
				</div>

				<WebCamModal
					openCamera={openCamera}
					setOpenCamera={setOpenCamera}
					capturePhoto={capturePhoto}
				/>
			
		</div>
	)
}

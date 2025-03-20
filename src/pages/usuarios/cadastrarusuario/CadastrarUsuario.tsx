import { Camera, UploadSimple, UserFocus } from "@phosphor-icons/react"
import { Controller } from "react-hook-form"
import { RotatingLines } from "react-loader-spinner"
import WebCamModal from "../../../components/webcam/webcammodal/WebCamModal"
import { useCadastrarUsuario } from "../../../hooks/usuarios/useCadastrarUsuario"

function CadastrarUsuario() {
	const {
		isLoading,
		register,
		handleSubmit,
		errors,
		onSubmit,
		control,
		retornar,
		fotoPreview,
		setFotoPreview,
		fileInputRef,
		cameraInputRef,
		handleFileChange,
		handleFileSelect,
		capturePhoto,
		openCamera,
		setOpenCamera,
	} = useCadastrarUsuario()

	return (
		<>
			<div className="flex items-center justify-center min-h-screen bg-gray-100 py-8">
				<div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-6xl lg:w-[90%]">
					<h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
						Cadastrar Usuário
					</h2>
					<div className="flex flex-col lg:flex-row gap-8">
						<div className="w-full lg:w-1/3 flex flex-col items-center justify-center">
							<div className="w-full">
								<div className="flex justify-center mb-4">
									<div className="w-48 h-48 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
										{fotoPreview ? (
											<img
												src={fotoPreview}
												alt="Preview da foto"
												className="w-full h-full object-cover"
												onError={() => setFotoPreview("")}
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
										name="fotoFile"
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
														if (
															fileInputRef.current !== e &&
															e !== null
														) {
															fileInputRef.current = e
														}
													}}
												/>
											</>
										)}
									/>

									<Controller
										name="fotoCamera"
										control={control}
										render={({ field }) => (
											<>
												<button
													type="button"
													onClick={() => setOpenCamera(true)}
													className="px-8 py-2 bg-green-600 text-white rounded hover:bg-green-500 transition flex items-center justify-center gap-2"
												>
													<Camera size={24} color="#ffffff" />
												</button>
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
														if (
															cameraInputRef.current !== e &&
															e !== null
														) {
															cameraInputRef.current = e
														}
													}}
												/>
											</>
										)}
									/>
								</div>

								{/* Popup para a webcam */}
								<WebCamModal
									openCamera={openCamera}
									setOpenCamera={setOpenCamera}
									capturePhoto={capturePhoto}
								/>

								{/* Campo oculto para armazenar o base64 da imagem */}
								<input type="hidden" {...register("foto")} />

								{errors.fotoFile && (
									<span className="text-red-500 text-sm block text-center">
										{errors.fotoFile.message}
									</span>
								)}
								{errors.foto && (
									<span className="text-red-500 text-sm block text-center">
										{errors.foto.message}
									</span>
								)}
							</div>
						</div>

						<div className="w-full lg:w-2/3">
							<form onSubmit={handleSubmit(onSubmit)}>
								<div className="flex flex-col w-full mb-4">
									<label
										htmlFor="nome"
										className="block text-gray-700 font-medium"
									>
										Nome
									</label>
									<input
										type="text"
										id="nome"
										placeholder="Adicione o nome"
										className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
										{...register("nome")}
									/>
									{errors.nome && (
										<span className="text-red-500 text-sm">
											{errors.nome.message}
										</span>
									)}
								</div>
								<div className="flex flex-col w-full mb-4">
									<label
										htmlFor="usuario"
										className="block text-gray-700 font-medium"
									>
										Usuario
									</label>
									<input
										type="text"
										id="usuario"
										placeholder="Adicione o usuário (e-mail)"
										className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
										{...register("usuario")}
									/>
									{errors.usuario && (
										<span className="text-red-500 text-sm">
											{errors.usuario.message}
										</span>
									)}
								</div>
								<div className="flex flex-col w-full mb-4">
									<label
										htmlFor="senha"
										className="block text-gray-700 font-medium"
									>
										Senha
									</label>
									<input
										type="password"
										id="senha"
										placeholder="Adicione a Senha"
										className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
										{...register("senha")}
									/>
									{errors.senha && (
										<span className="text-red-500 text-sm">
											{errors.senha.message}
										</span>
									)}
								</div>
								<div className="flex flex-col w-full mb-4">
									<label
										htmlFor="confirmarSenha"
										className="block text-gray-700 font-medium"
									>
										Confirmar Senha
									</label>
									<input
										type="password"
										id="confirmarSenha"
										placeholder="Confirmar a Senha"
										className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
										{...register("confirmarSenha")}
									/>
									{errors.confirmarSenha && (
										<span className="text-red-500 text-sm">
											{errors.confirmarSenha.message}
										</span>
									)}
								</div>
								<div className="flex justify-around gap-8 w-full">
									<button
										type="button"
										className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-400 transition flex justify-center"
										onClick={retornar}
									>
										Cancelar
									</button>

									<button
										type="submit"
										className="w-full bg-indigo-900 text-white py-2 rounded hover:bg-indigo-400 transition flex justify-center"
										disabled={isLoading}
									>
										{isLoading ? (
											<RotatingLines
												strokeColor="white"
												strokeWidth="5"
												animationDuration="0.75"
												width="24"
												visible={true}
											/>
										) : (
											<span>Cadastrar</span>
										)}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default CadastrarUsuario

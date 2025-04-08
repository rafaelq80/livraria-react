import { Controller } from "react-hook-form"
import { RotatingLines } from "react-loader-spinner"
import { useCadastrarUsuario } from "../../../hooks/usuarios/useCadastrarUsuario"
import { CampoFoto } from "../../campofoto/CampoFoto"

interface FormUsuarioProps {
	isPerfil?: boolean
}

function FormUsuario({ isPerfil = false }: FormUsuarioProps) {
	const {
		id,
		isLoading,
		register,
		handleSubmit,
		errors,
		onSubmit,
		control,
		setValue,
		retornar,
		rolesList,
		isAdmin,
		fotoPreview,
	} = useCadastrarUsuario(isPerfil)

	return (
		<>
			<div className="bg-white shadow-lg rounded-lg mx-2 p-8 w-full max-w-6xl lg:w-[90%]">
				<h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
					{id ? "Editar Usuário" : "Cadastrar Usuário"}
				</h2>
				<div className="flex flex-col lg:flex-row gap-8">
					<div className="w-full lg:w-1/3 flex flex-col items-center justify-center">
						<CampoFoto
							control={control}
							setValue={setValue}
							photoFieldName="fotoFile"
							label="Foto do Perfil"
							initialPreview={fotoPreview}
						/>
					</div>

					<div className="w-full lg:w-2/3">
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="flex flex-col w-full mb-4">
								<label htmlFor="nome" className="block text-gray-700 font-medium">
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
								<label htmlFor="senha" className="block text-gray-700 font-medium">
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

							{/* Role Selection */}
							{isAdmin && (
								<div className="flex flex-col w-full mb-4">
									<label
										htmlFor="role"
										className="block text-gray-700 font-medium"
									>
										Papel de Usuário
									</label>
									<Controller
										name="role"
										control={control}
										render={({ field }) => (
											<select
												{...field}
												className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
											>
												{rolesList.map((role) => (
													<option key={role.id} value={role.id}>
														{role.descricao}
													</option>
												))}
											</select>
										)}
									/>
									{errors.role && (
										<span className="text-red-500 text-sm">
											{errors.role.message}
										</span>
									)}
								</div>
							)}

							<div className="flex justify-around gap-8 w-full">
								{!isPerfil && (
									<button
										type="button"
										className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-400 transition flex justify-center"
										onClick={retornar}
									>
										Cancelar
									</button>
								)}

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
										<span>{id ? "Atualizar" : "Cadastrar"}</span>
									)}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}

export default FormUsuario

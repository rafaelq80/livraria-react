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
				<h2 className="mb-6 text-3xl font-semibold text-center text-gray-800">
					{id ? "Editar Usuário" : "Cadastrar Usuário"}
				</h2>
				<div className="flex flex-col gap-8 lg:flex-row">
					<div className="flex flex-col items-center justify-center w-full lg:w-1/3">
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
								<label htmlFor="nome" className="block font-medium text-gray-700">
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
									<span className="text-sm text-red-500">
										{errors.nome.message}
									</span>
								)}
							</div>
							<div className="flex flex-col w-full mb-4">
								<label
									htmlFor="usuario"
									className="block font-medium text-gray-700"
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
									<span className="text-sm text-red-500">
										{errors.usuario.message}
									</span>
								)}
							</div>
							<div className="flex flex-col w-full mb-4">
								<label htmlFor="senha" className="block font-medium text-gray-700">
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
									<span className="text-sm text-red-500">
										{errors.senha.message}
									</span>
								)}
							</div>
							<div className="flex flex-col w-full mb-4">
								<label
									htmlFor="confirmarSenha"
									className="block font-medium text-gray-700"
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
									<span className="text-sm text-red-500">
										{errors.confirmarSenha.message}
									</span>
								)}
							</div>

							{/* Role Selection */}
							{isAdmin && (
								<div className="flex flex-col w-full mb-4">
									<label
										htmlFor="role"
										className="block font-medium text-gray-700"
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
										<span className="text-sm text-red-500">
											{errors.role.message}
										</span>
									)}
								</div>
							)}

							<div className="flex justify-around w-full gap-8">
								{!isPerfil && (
									<button
										type="button"
										className="flex justify-center w-full py-2 text-white transition bg-red-500 rounded hover:bg-red-400"
										onClick={retornar}
									>
										Cancelar
									</button>
								)}

								<button
									type="submit"
									className="flex justify-center w-full py-2 text-white transition bg-indigo-900 rounded hover:bg-indigo-700"
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

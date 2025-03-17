import { RotatingLines } from "react-loader-spinner"
import { useCadastrarUsuario } from "../../../hooks/usuarios/useCadastrarUsuario"

function CadastrarUsuario() {
	const { isLoading, register, handleSubmit, errors, onSubmit, retornar } = useCadastrarUsuario()
	
	return (
		<>
			<div className="flex items-center justify-center min-h-screen bg-gray-100 py-8">
				<div className="bg-white shadow-lg rounded-lg p-8 w-[50%]">
					<h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
						Cadastrar Usuário
					</h2>
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
								<span className="text-red-500 text-sm">{errors.nome.message}</span>
							)}
						</div>
						<div className="flex flex-col w-full mb-4">
							<label htmlFor="usuario" className="block text-gray-700 font-medium">
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
							<label htmlFor="foto" className="block text-gray-700 font-medium">
								Foto
							</label>
							<input
								type="text"
								id="foto"
								placeholder="Adicione a Foto"
								className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								{...register("foto")}
							/>
							{errors.foto && (
								<span className="text-red-500 text-sm">{errors.foto.message}</span>
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
								<span className="text-red-500 text-sm">{errors.senha.message}</span>
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
		</>
	)
}

export default CadastrarUsuario

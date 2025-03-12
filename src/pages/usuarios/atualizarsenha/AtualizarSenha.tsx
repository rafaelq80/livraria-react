import { RotatingLines } from "react-loader-spinner"
import { useAtualizarSenha } from "../../../hooks/usuarios/useAtualizarSenha"

function AtualizarSenha() {
	const { tokenError, message, isLoading, register, errors, onSubmit, redirectToRecovery } =
		useAtualizarSenha()

	if (tokenError) {
		return (
			<div className="flex items-center justify-center min-h-screen bg-gray-100">
				<div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
					<div className="p-3 bg-red-100 text-red-700 rounded">
						{tokenError}. <br />
						Por favor, solicite um novo link de recuperação.
					</div>
					<button
						onClick={redirectToRecovery}
						className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-400"
					>
						Voltar
					</button>
				</div>
			</div>
		)
	}

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
				<h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
					Redefinir Senha
				</h2>

				{message && (
					<div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{message}</div>
				)}

				<form onSubmit={onSubmit}>
					<div className="mb-4">
						<label htmlFor="senha" className="block mb-2 text-sm font-medium">
							Nova Senha
						</label>
						<input
							type="password"
							id="senha"
							className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
								errors.senha ? "border-red-500" : ""
							}`}
							{...register("senha")}
						/>
						{errors.senha && (
							<p className="mt-1 text-sm text-red-600">{errors.senha.message}</p>
						)}
					</div>

					<div className="mb-4">
						<label htmlFor="confirmarSenha" className="block mb-2 text-sm font-medium">
							Confirmar Nova Senha
						</label>
						<input
							type="password"
							id="confirmarSenha"
							className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
								errors.confirmarSenha ? "border-red-500" : ""
							}`}
							{...register("confirmarSenha")}
						/>
						{errors.confirmarSenha && (
							<p className="mt-1 text-sm text-red-600">
								{errors.confirmarSenha.message}
							</p>
						)}
					</div>

					<button
						type="submit"
						disabled={isLoading}
						className="flex justify-center w-full bg-indigo-900 text-white py-2 px-4 rounded hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-blue-700 disabled:opacity-50"
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
							<span>Continuar</span>
						)}
					</button>
				</form>
			</div>
		</div>
	)
}

export default AtualizarSenha

import { useAtualizarSenha } from "../../usuario/hooks/useAtualizarSenha"
import Button from "../../shared/components/ui/Button"

function AtualizarSenha() {
	const { tokenError, message, isLoading, register, errors, onSubmit, voltar } =
		useAtualizarSenha()

	if (tokenError) {
		return (
			<div className="flex items-center justify-center min-h-screen bg-gray-100">
				<div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
					<div className="p-3 bg-red-100 text-red-700 rounded">
						{tokenError}. <br />
						Por favor, solicite um novo link de recuperação.
					</div>
					<Button
						variant="danger"
						size="full"
						onClick={voltar}
						className="mt-4"
					>
						Voltar
					</Button>
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

					<Button
						type="submit"
						variant="primary"
						size="full"
						isLoading={isLoading}
						disabled={isLoading}
					>
						Continuar
					</Button>
				</form>
			</div>
		</div>
	)
}

export default AtualizarSenha

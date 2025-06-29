import { useFormRole } from "../hooks/useFormRole"
import Button from "../../shared/components/ui/Button"

function FormRole() {
	const { id, isLoading, register, handleSubmit, errors, onSubmit, retornar } = useFormRole()

	return (
		<div className="flex items-center justify-center min-h-[50vh] md:min-h-screen bg-gray-100 p-4">
			<div className="bg-white shadow-lg rounded-lg mx-2 p-8 w-full max-w-5xl md:w-[60%] lg:w-[60%]">
				<h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-6">
					{id ? "Editar Role" : "Cadastrar Role"}
				</h2>
				<div className="flex flex-col justify-center lg:flex-row gap-8">
					<div className="w-full lg:w-2/3">
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="flex flex-col w-full mb-4">
								<label htmlFor="nome" className="block text-gray-700 font-medium">
									Permissão
								</label>
								<input
									type="text"
									id="nome"
									placeholder="Adicione a role"
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
									htmlFor="descricao"
									className="block text-gray-700 font-medium"
								>
									Descrição
								</label>
								<input
									type="text"
									id="descricao"
									placeholder="Adicione a descricao"
									className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
									{...register("descricao")}
								/>
								{errors.descricao && (
									<span className="text-red-500 text-sm">
										{errors.descricao.message}
									</span>
								)}
							</div>

							<div className="flex justify-around gap-8 w-full">
								<Button
									type="button"
									variant="danger"
									size="full"
									onClick={retornar}
								>
									Cancelar
								</Button>

								<Button
									type="submit"
									variant="primary"
									size="full"
									isLoading={isLoading}
									disabled={isLoading}
								>
									{id ? "Atualizar" : "Cadastrar"}
								</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FormRole

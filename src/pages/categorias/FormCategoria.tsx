import { RotatingLines } from "react-loader-spinner"
import { useFormCategoria } from "../../hooks/categorias/useFormCategoria"

function FormCategoria() {
	const { id, isLoading, register, handleSubmit, errors, onSubmit, retornar } = useFormCategoria()

	return (
		<>
			<div className="flex items-center justify-center min-h-[50vh] md:min-h-screen bg-gray-100 p-4">
				<div className="bg-white shadow-lg rounded-lg mx-2 p-8 w-full max-w-5xl md:w-[60%] lg:w-[60%]">
					<h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-6">
						{id ? "Editar Categoria" : "Cadastrar Categoria"}
					</h2>
					<div className="flex flex-col justify-center lg:flex-row gap-8">
						<div className="w-full lg:w-2/3">
							<form onSubmit={handleSubmit(onSubmit)}>
								<div className="flex flex-col w-full mb-4">
									<label
										htmlFor="tipo"
										className="block text-gray-700 font-medium"
									>
										Categoria
									</label>
									<input
										type="text"
										id="tipo"
										placeholder="Adicione a categoria"
										className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
										{...register("tipo")}
									/>
									{errors.tipo && (
										<span className="text-red-500 text-sm">
											{errors.tipo.message}
										</span>
									)}
								</div>

								<div className="flex justify-around gap-8 w-full">

								<button
										type="button"
										className="w-1/2 bg-red-500 text-white py-2 rounded hover:bg-red-400 transition flex justify-center"
										onClick={retornar}
									>
										Cancelar
									</button>

									<button
										type="submit"
										className="w-1/2 bg-indigo-900 text-white py-2 rounded hover:bg-indigo-700 transition flex justify-center"
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
			</div>
		</>
	)
}

export default FormCategoria

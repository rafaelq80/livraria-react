import Button from "../../shared/components/ui/Button"
import InputField from "../../shared/components/ui/InputField"
import { useFormAutor } from "../hooks/useFormAutor"
import { StrictContainerLoadingSpinner } from "../../shared/components/loading"

function FormAutor() {
	const { id, isLoading, isFormLoading, register, handleSubmit, errors, onSubmit, retornar } = useFormAutor()

	return (
		<div className="flex items-center justify-center min-h-[50vh] md:h-screen bg-gray-100 p-4">
			{isFormLoading ? (
				<StrictContainerLoadingSpinner />
			) : (
				<div className="bg-white shadow-lg rounded-lg mx-2 p-8 w-full max-w-5xl md:w-[60%] lg:w-[60%]">
					<h2 className="text-2xl md:text-3xl lg:text-4xl text-center mb-6 text-gray-800">
						{id ? "Editar Autor" : "Cadastrar Autor"}
					</h2>
					<div className="flex flex-col justify-center lg:flex-row gap-8">
						<div className="w-full lg:w-2/3">
							<form onSubmit={handleSubmit(onSubmit)}>
								<div className="flex flex-col w-full mb-4">
									<InputField
										id="nome"
										label="Nome"
										placeholder="Insira o nome do Autor"
										error={errors.nome?.message}
										{...register("nome")}
									/>
								</div>

								<div className="flex flex-col w-full mb-4">
									<InputField
										id="nacionalidade"
										label="Nacionalidade"
										placeholder="Insira a nacionalidade do Autor"
										error={errors.nacionalidade?.message}
										{...register("nacionalidade")}
									/>
								</div>

								<div className="flex justify-around gap-8 w-full">
								<Button
										type="reset"
										variant="danger"
										size="full"
										className="md:w-1/2 lg:w-1/2"
										onClick={retornar}
										aria-label="Cancelar"
									>
										Cancelar
									</Button>
									
									<Button
										type="submit"
										isLoading={isLoading}
										size="full"
										className="md:w-1/2 lg:w-1/2"
										aria-label={id !== undefined ? "Atualizar" : "Cadastrar"}
									>
										{id !== undefined ? "Atualizar" : "Cadastrar"}
									</Button>

								</div>
							</form>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default FormAutor

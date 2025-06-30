import { useFormRole } from "../hooks/useFormRole"
import Button from "../../shared/components/ui/Button"
import InputField from "../../shared/components/ui/InputField"
import { StrictContainerLoadingSpinner } from "../../shared/components/loading"

function FormRole() {
	const { id, isLoading, isFormLoading, register, handleSubmit, errors, onSubmit, retornar } = useFormRole()

	return (
		<div className="flex items-center justify-center min-h-[50vh] md:min-h-screen bg-gray-100 p-4">
			{isFormLoading ? (
				<StrictContainerLoadingSpinner />
			) : (
				<div className="bg-white shadow-lg rounded-lg mx-2 p-8 w-full max-w-5xl md:w-[60%] lg:w-[60%]">
					<h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-6">
						{id ? "Editar Role" : "Cadastrar Role"}
					</h2>
					<div className="flex flex-col justify-center lg:flex-row gap-8">
						<div className="w-full lg:w-2/3">
							<form onSubmit={handleSubmit(onSubmit)}>
								<div className="flex flex-col w-full mb-4">
									<InputField
										id="nome"
										label="Permissão"
										placeholder="Adicione a role"
										error={errors.nome?.message}
										{...register("nome")}
									/>
								</div>

								<div className="flex flex-col w-full mb-4">
									<InputField
										id="descricao"
										label="Descrição"
										placeholder="Adicione a descrição"
										error={errors.descricao?.message}
										{...register("descricao")}
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
										variant="primary"
										size="full"
										className="md:w-1/2 lg:w-1/2"
										isLoading={isLoading}
										disabled={isLoading}
										aria-label={id ? "Atualizar" : "Cadastrar"}
									>
										{id ? "Atualizar" : "Cadastrar"}
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

export default FormRole

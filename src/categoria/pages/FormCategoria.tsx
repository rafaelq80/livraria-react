import Button from "../../shared/components/ui/Button"
import InputField from "../../shared/components/ui/InputField"
import { useFormCategoria } from "../hooks/useFormCategoria"

/**
 * Página de formulário de categoria (criar/editar)
 *
 * Funcionalidades:
 * - Formulário para criar nova categoria ou editar existente
 * - Validação de campos obrigatórios
 * - Loading durante submissão
 * - Navegação de volta para listagem
 * - Layout responsivo
 */
function FormCategoria() {
	const { id, isLoading, register, handleSubmit, errors, onSubmit, retornar } = useFormCategoria()

	return (
		<div className="flex items-center justify-center min-h-[50vh] md:h-screen bg-gray-100 p-4">
			<div className="bg-white shadow-lg rounded-lg mx-2 p-8 w-full max-w-5xl md:w-[60%] lg:w-[60%]">
				{/* Título dinâmico baseado na operação */}
				<h2 className="text-2xl md:text-3xl lg:text-4xl text-center mb-6 text-gray-800">
					{id ? "Editar Categoria" : "Cadastrar Categoria"}
				</h2>
				
				<div className="flex flex-col justify-center lg:flex-row gap-8">
					<div className="w-full lg:w-2/3">
						{/* Formulário de categoria */}
						<form onSubmit={handleSubmit(onSubmit)}>
							{/* Campo de categoria */}
							<div className="flex flex-col w-full mb-4">
								<InputField
									id="tipo"
									label="Categoria"
									placeholder="Insira a Categoria"
									error={errors.tipo?.message}
									{...register("tipo")}
								/>
							</div>

							{/* Botões de ação */}
							<div className="flex justify-around gap-8 w-full">
								{/* Botão cancelar */}
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
								
								{/* Botão de submissão */}
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
		</div>
	)
}

export default FormCategoria

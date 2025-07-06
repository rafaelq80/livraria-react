import { StrictContainerLoadingSpinner } from "../../shared/components/loading"
import Button from "../../shared/components/ui/Button"
import InputField from "../../shared/components/ui/InputField"
import { useFormAutor } from "../hooks/useFormAutor"

// Constantes para melhorar manutenibilidade
const FORM_CONFIG = {
	title: {
		create: "Cadastrar Autor",
		edit: "Editar Autor",
	},
	button: {
		create: "Cadastrar",
		edit: "Atualizar",
		cancel: "Cancelar",
	},
	placeholder: {
		nome: "Insira o nome do Autor",
		nacionalidade: "Insira a nacionalidade do Autor",
	},
} as const

/**
 * Componente de formulário para criação e edição de autores
 * 
 * Funcionalidades:
 * - Formulário responsivo para desktop e mobile
 * - Modo duplo: criação (sem id) e edição (com id)
 * - Validação em tempo real com exibição de erros
 * - Estados de loading para melhor UX
 * - Navegação automática após operações
 * 
 * Estados:
 * - isFormLoading: Carregamento inicial dos dados (modo edição)
 * - isLoading: Loading durante submissão do formulário
 * 
 * @example
 * ```tsx
 * // Modo criação
 * <FormAutor />
 * 
 * // Modo edição (com id na URL)
 * <FormAutor />
 * ```
 */
function FormAutor() {
	// Hook customizado que gerencia toda a lógica do formulário
	const { id, isLoading, isFormLoading, register, handleSubmit, errors, onSubmit, retornar } =
		useFormAutor()

	// Determina o modo do formulário
	const isEditMode = Boolean(id)
	const title = isEditMode ? FORM_CONFIG.title.edit : FORM_CONFIG.title.create
	const submitButtonText = isEditMode ? FORM_CONFIG.button.edit : FORM_CONFIG.button.create

	return (
		<div className="flex items-center justify-center min-h-[50vh] md:h-screen bg-gray-100 p-4">
			{/* Exibe spinner durante carregamento inicial dos dados */}
			{isFormLoading ? (
				<div role="status">
					<StrictContainerLoadingSpinner />
				</div>
			) : (
				<div className="bg-white shadow-lg rounded-lg mx-2 p-8 w-full max-w-2xl">
					{/* Título dinâmico baseado no modo (criação/edição) */}
					<h2 className="text-2xl md:text-3xl lg:text-4xl text-center mb-6 text-gray-800">
						{title}
					</h2>
					
					{/* Formulário principal com validação automática */}
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						{/* Campo Nome - obrigatório */}
						<InputField
							id="nome"
							label="Nome"
							placeholder={FORM_CONFIG.placeholder.nome}
							error={errors.nome?.message}
							required
							aria-describedby={errors.nome ? "nome-error" : undefined}
							{...register("nome")}
						/>
						
						{/* Mensagem de erro para acessibilidade */}
						{errors.nome && (
							<div id="nome-error" className="sr-only" role="alert">
								{errors.nome.message}
							</div>
						)}

						{/* Campo Nacionalidade - opcional */}
						<InputField
							id="nacionalidade"
							label="Nacionalidade (opcional)"
							placeholder={FORM_CONFIG.placeholder.nacionalidade}
							error={errors.nacionalidade?.message}
							aria-describedby={errors.nacionalidade ? "nacionalidade-error" : undefined}
							{...register("nacionalidade")}
						/>
						
						{/* Mensagem de erro para acessibilidade */}
						{errors.nacionalidade && (
							<div id="nacionalidade-error" className="sr-only" role="alert">
								{errors.nacionalidade.message}
							</div>
						)}

						{/* Botões de ação - Cancelar e Salvar/Atualizar */}
						<div className="flex gap-4 pt-4">
							{/* Botão Cancelar - retorna à listagem */}
							<Button
								type="button"
								variant="danger"
								size="full"
								onClick={retornar}
								aria-label={FORM_CONFIG.button.cancel}
								disabled={isLoading}
							>
								{FORM_CONFIG.button.cancel}
							</Button>

							{/* Botão de submissão - dinâmico baseado no modo */}
							<Button
								name="enviar"
								type="submit"
								isLoading={isLoading}
								size="full"
								aria-label={submitButtonText}
							>
								{submitButtonText}
							</Button>
						</div>
					</form>
				</div>
			)}
		</div>
	)
}

export default FormAutor

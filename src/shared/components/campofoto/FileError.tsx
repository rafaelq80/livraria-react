import { WarningIcon } from "@phosphor-icons/react"

/**
 * Interface que define as propriedades do componente de erro de arquivo
 */
interface FileErrorProps {
	/** Mensagem de erro a ser exibida */
	error: string
}

/**
 * Componente de exibição de erro para arquivos com funcionalidades de:
 * - Exibição de mensagens de erro de validação
 * - Estilo visual consistente com tema de erro
 * - Ícone de aviso para melhor identificação
 * - Layout responsivo e centralizado
 * - Acessibilidade com cores contrastantes
 */
export function FileError({ error }: Readonly<FileErrorProps>) {
	return (
		<div className="w-full max-w-md flex items-center justify-center mb-2">
			{/* Container com estilo de erro */}
			<div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-100">
				{/* Ícone de aviso */}
				<WarningIcon size={20} color="#dc2626" className="mt-0.5" />
				{/* Mensagem de erro */}
				<p>{error}</p>
			</div>
		</div>
	)
} 
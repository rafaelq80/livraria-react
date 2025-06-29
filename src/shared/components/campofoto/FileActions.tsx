import { XIcon } from "@phosphor-icons/react"
import Button from "../ui/Button"

/**
 * Interface que define as propriedades do componente de ações de arquivo
 */
interface FileActionsProps {
	/** Função chamada quando o usuário deseja remover o arquivo */
	onRemove: () => void
}

/**
 * Componente de ações para arquivos com funcionalidades de:
 * - Botão para remoção de arquivo
 * - Estilo visual consistente com tema de erro
 * - Acessibilidade com foco e estados hover
 * - Ícone visual para melhor UX
 * - Layout responsivo e centralizado
 */
export function FileActions({ onRemove }: Readonly<FileActionsProps>) {
	return (
		<div className="flex justify-center gap-2 mt-2">
			{/* Botão para remover arquivo */}
			<Button
				type="button"
				variant="outline"
				size="md"
				leftIcon={<XIcon size={20} />}
				onClick={onRemove}
				className="text-red-600 border-red-600 hover:bg-red-50"
			>
				Remover
			</Button>
		</div>
	)
} 
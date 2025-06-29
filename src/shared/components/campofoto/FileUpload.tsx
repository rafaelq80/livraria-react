import { UploadSimpleIcon } from "@phosphor-icons/react"

/**
 * Interface que define as propriedades do componente de upload de arquivo
 */
interface FileUploadProps {
	/** Função chamada quando um arquivo válido é selecionado */
	onFileSelect: (file: File) => void
	/** Array com os tipos MIME permitidos */
	allowedTypes: string[]
	/** Tamanho máximo do arquivo em bytes */
	maxFileSize: number
}

/**
 * Componente de upload de arquivo com funcionalidades de:
 * - Validação de tipo de arquivo
 * - Validação de tamanho máximo
 * - Interface drag-and-drop visual
 * - Mensagens de erro informativas
 * - Acessibilidade com labels apropriados
 * - Estilo visual consistente
 */
export function FileUpload({ onFileSelect, allowedTypes, maxFileSize }: Readonly<FileUploadProps>) {
	/**
	 * Manipula a seleção de arquivo com validações
	 * @param event Evento de mudança do input file
	 */
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		// Verificar o tipo do arquivo
		if (!allowedTypes.includes(file.type)) {
			alert(`Tipo de arquivo não permitido. Use: ${allowedTypes.join(', ')}`);
			return;
		}

		// Verificar o tamanho do arquivo
		if (file.size > maxFileSize) {
			alert(`Arquivo muito grande. Tamanho máximo: ${maxFileSize / (1024 * 1024)}MB`);
			return;
		}

		// Chama a função de callback com o arquivo válido
		onFileSelect(file);
	}

	return (
		<div className="w-full max-w-md">
			{/* Label clicável que simula área de upload */}
			<label 
				htmlFor="file-upload"
				className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
			>
				{/* Conteúdo visual da área de upload */}
				<div className="flex flex-col items-center justify-center pt-5 pb-6">
					{/* Ícone de upload */}
					<UploadSimpleIcon size={48} color="#6b7280" />
					{/* Texto principal */}
					<p className="mb-2 text-sm text-gray-500">
						<span className="font-semibold">Clique para fazer upload</span> ou arraste e solte
					</p>
					{/* Informações sobre tipos e tamanho */}
					<p className="text-xs text-gray-500">PNG, JPG ou JPEG (MAX. 2MB)</p>
				</div>
				{/* Input de arquivo oculto */}
				<input 
					id="file-upload" 
					type="file" 
					className="hidden" 
					accept={allowedTypes.join(',')}
					onChange={handleFileChange}
				/>
			</label>
		</div>
	)
} 
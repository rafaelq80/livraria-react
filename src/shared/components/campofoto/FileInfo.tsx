import { InfoIcon } from "@phosphor-icons/react"

/**
 * Interface que define as propriedades do componente de informações de arquivo
 */
interface FileInfoProps {
	/** Controla se as informações devem ser exibidas */
	showFileInfo: boolean
	/** Array com os tipos MIME permitidos */
	allowedTypes: string[]
	/** Tamanho máximo do arquivo em bytes */
	maxFileSize: number
}

/**
 * Componente que exibe informações sobre os requisitos de arquivo com funcionalidades de:
 * - Formatação automática de tamanhos (bytes, KB, MB)
 * - Conversão de tipos MIME para extensões legíveis
 * - Layout responsivo com ícone informativo
 * - Estilo visual consistente com tema da aplicação
 * - Renderização condicional baseada em prop
 */
export function FileInfo({ showFileInfo, allowedTypes, maxFileSize }: Readonly<FileInfoProps>) {
	// Retorna null se não deve exibir as informações
	if (!showFileInfo) return null;

	/**
	 * Converte bytes para formato legível (bytes, KB, MB)
	 * @param bytes Tamanho em bytes
	 * @returns String formatada com unidade apropriada
	 */
	const formatFileSize = (bytes: number): string => {
		if (bytes < 1024) return bytes + ' bytes';
		else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
		else return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
	}

	/**
	 * Converte tipos MIME para extensões legíveis
	 * @param types Array de tipos MIME
	 * @returns String com extensões separadas por vírgula
	 */
	const formatAllowedTypes = (types: string[]): string => {
		return types.map(type => type.replace('image/', '').toUpperCase()).join(', ');
	}
	
	return (
		<div className="w-full max-w-md flex items-center justify-center mb-2">
			{/* Container com estilo informativo */}
			<div className="flex items-start gap-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-md border border-blue-100">
				{/* Ícone informativo */}
				<InfoIcon size={20} color="#3b82f6" className="mt-0.5" />
				{/* Conteúdo das informações */}
				<div>
					<p className="font-medium">Requisitos do arquivo:</p>
					<ul className="list-disc ml-5 mt-1">
						<li>Formatos aceitos: {formatAllowedTypes(allowedTypes)}</li>
						<li>Tamanho máximo: {formatFileSize(maxFileSize)}</li>
					</ul>
				</div>
			</div>
		</div>
	)
} 
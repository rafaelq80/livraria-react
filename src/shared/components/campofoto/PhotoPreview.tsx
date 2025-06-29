import { UserFocusIcon } from "@phosphor-icons/react"

/**
 * Interface que define as propriedades do componente de preview de foto
 */
interface PhotoPreviewProps {
	/** URL da imagem para exibir no preview */
	photoPreview: string
	/** Rótulo/texto descritivo da foto */
	label?: string
	/** Força formato quadrado para a imagem */
	square: boolean
	/** Função para limpar o preview em caso de erro */
	setPhotoPreview: (preview: string) => void
}

/**
 * Componente de preview de foto com funcionalidades de:
 * - Exibição da imagem selecionada
 * - Suporte a formato circular ou quadrado
 * - Estado vazio com ícone e texto
 * - Tratamento de erro de carregamento
 * - Layout responsivo e centralizado
 * - Acessibilidade com alt text apropriado
 */
export function PhotoPreview({ photoPreview, label, square, setPhotoPreview }: Readonly<PhotoPreviewProps>) {
	return (
		<div className="flex justify-center mb-4">
			{/* Container principal do preview */}
			<div
				className={`w-52 ${!square ? "rounded-full h-52" : "h-68 aspect-square"} 
          border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden`}
			>
				{/* Renderiza a imagem se houver preview */}
				{photoPreview ? (
					<img
						src={photoPreview}
						alt={label ?? "Preview da foto"}
						className={`w-full h-full object-cover ${!square ? "rounded-full" : ""}`}
						onError={() => setPhotoPreview("")}
					/>
				) : (
					/* Estado vazio com ícone e texto */
					<div className="flex flex-col items-center p-4 text-center text-gray-400">
						<UserFocusIcon size={64} color="#99a1af" />
						<p>{label ?? "Foto"}</p>
					</div>
				)}
			</div>
		</div>
	)
} 
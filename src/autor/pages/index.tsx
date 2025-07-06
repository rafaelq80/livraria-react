import DataTable from "../../shared/components/datatable/DataTable"
import { StrictContainerLoadingSpinner } from "../../shared/components/loading"
import { useListarAutores } from "../hooks/useListarAutores"
import { createAutorColumns } from "./AutorColumns"
import messages from "../../shared/constants/messages"

/**
 * Página de listagem de autores
 *
 * Funcionalidades:
 * - Exibe tabela de autores com ações de editar e excluir
 * - Permite adicionar novo autor
 * - Mostra loading durante carregamento dos dados
 * - Integra controle de admin e recarregamento automático
 */
function ListarAutores() {
	const { autores, isLoading, isAdmin, navigate, recarregarAutores } = useListarAutores()
	const columns = createAutorColumns(recarregarAutores)

	return (
		<div className="p-4 min-h-screen">
			{/* Exibe spinner enquanto carrega os dados */}
			{isLoading ? (
				<StrictContainerLoadingSpinner />
			) : (
				<div>
					{/* Tabela de autores com ações e controle de admin */}
					<DataTable
						data={autores}
						columns={columns}
						title="Autor"
						onAddNew={() => navigate("/cadastrarautor")} // Navega para cadastro de novo autor
						columnSpans={["col-span-6", "col-span-5", "col-span-1"]} // Layout responsivo das colunas
						isAdmin={isAdmin} // Exibe ações extras se for admin
						emptyMessage={messages.autor.emptyList} // Mensagem quando lista está vazia
						forbiddenMessage={messages.global.forbidden} // Mensagem quando não tem permissão
					/>
				</div>
			)}
		</div>
	)
}

export default ListarAutores

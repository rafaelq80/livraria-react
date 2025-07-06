import DataTable from "../../shared/components/datatable/DataTable"
import { StrictContainerLoadingSpinner } from "../../shared/components/loading"
import { useListarCategorias } from "../hooks/useListarCategorias"
import { createCategoriaColumns } from "./CategoriaColumns"
import messages from "../../shared/constants/messages"

/**
 * Página de listagem de categorias
 *
 * Funcionalidades:
 * - Exibe tabela de categorias com ações de editar e excluir
 * - Permite adicionar nova categoria
 * - Mostra loading durante carregamento dos dados
 * - Integra controle de admin e recarregamento automático
 */
function ListarCategorias() {
	const { categorias, isLoading, isAdmin, navigate, recarregarCategorias } = useListarCategorias()
	const columns = createCategoriaColumns(recarregarCategorias)

	return (
		<div className="p-4 min-h-screen">
			{/* Exibe spinner enquanto carrega os dados */}
			{isLoading ? (
				<StrictContainerLoadingSpinner />
			) : (
				<div>
					{/* Tabela de categorias com ações e controle de admin */}
					<DataTable
						data={categorias}
						columns={columns}
						title="Categoria"
						onAddNew={() => navigate("/cadastrarcategoria")} // Navega para cadastro de nova categoria
						columnSpans={["col-span-11", "col-span-1"]} // Layout responsivo das colunas
						isAdmin={isAdmin} // Exibe ações extras se for admin
						emptyMessage={messages.categoria.emptyList} // Mensagem quando lista está vazia
						forbiddenMessage={messages.global.forbidden} // Mensagem quando não tem permissão
					/>
				</div>
			)}
		</div>
	)
}

export default ListarCategorias
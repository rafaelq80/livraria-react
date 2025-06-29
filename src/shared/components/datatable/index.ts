/**
 * Exportações dos componentes de tabela de dados
 * 
 * Este arquivo centraliza as exportações dos componentes DataTable
 * para facilitar a importação e organização do código.
 */

// Componente principal da tabela de dados
export { default as DataTable } from './DataTable';

// Componente de cabeçalho com busca e botão de adicionar
export { DataTableHeader } from './DataTableHeader';

// Visualização desktop da tabela (grid responsivo)
export { DataTableDesktopView } from './DataTableDesktopView';

// Visualização mobile da tabela (cards)
export { DataTableMobileView } from './DataTableMobileView';

// Componente de paginação
export { DataTablePagination } from './DataTablePagination'; 
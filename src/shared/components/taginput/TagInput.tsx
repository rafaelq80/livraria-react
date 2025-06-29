import { XIcon } from "@phosphor-icons/react"
import SearchInput from "../ui/SearchInput"
import Button from "../ui/Button"
import { useTagInput } from "../../hooks/taginput/useTagInput"

/**
 * Interface que define as propriedades do componente de entrada de tags
 */
interface TagInputProps<T> {
  /** Rótulo do campo de entrada */
  label: string
  /** Lista completa de itens disponíveis para seleção */
  itensDisponiveis: T[]
  /** Lista de itens atualmente selecionados */
  itensSelecionados: T[]
  /** Função para atualizar a lista de itens selecionados */
  setItensSelecionados: (itens: T[]) => void
  /** Função para extrair o nome de exibição de um item */
  getNome: (item: T) => string
  /** Função para extrair o ID único de um item */
  getId: (item: T) => number
  /** Objeto contendo mensagens de erro */
  errors?: {
    message?: string
  }
}

/**
 * Componente de entrada de tags com funcionalidades de:
 * - Seleção múltipla de itens através de busca
 * - Exibição de tags selecionadas como chips
 * - Remoção individual de tags
 * - Busca em tempo real com sugestões
 * - Validação e mensagens de erro
 * - Interface responsiva e acessível
 */
function TagInput<T extends { id: number }>(
  {
    label,
    itensDisponiveis,
    itensSelecionados,
    setItensSelecionados,
    getNome,
    getId,
  errors,
  }: Readonly<TagInputProps<T>>
) {
  // Hook customizado que gerencia toda a lógica do componente
  const {
    searchTerm,
    dropdownOpen,
    filteredItems,
    addItem,
    removeItem,
    handleSearchChange,
    setDropdownOpen
  } = useTagInput<T>({
    itensDisponiveis,
    itensSelecionados,
    setItensSelecionados,
    getNome,
    getId,
  })

  /**
   * Converte a lista de itens filtrados em sugestões de texto
   * Exibe sugestões apenas quando o dropdown está aberto e há texto digitado
   */
  const itensSugeridos = dropdownOpen && searchTerm.trim() !== ""
    ? filteredItems.map(getNome)
    : [];
  
  /**
   * Manipula a seleção de um item da lista de sugestões
   * Localiza o item correspondente na lista filtrada e o adiciona aos selecionados
   */
  const handleSelecionarItem = (suggestion: string) => {
    const selectedItem = filteredItems.find((item) => getNome(item) === suggestion)
    if (selectedItem) {
      addItem(selectedItem)
    }
  }

  /**
   * Manipula o clique no campo de busca
   * Abre o dropdown se houver texto digitado para mostrar sugestões
   */
  const handleInputClick = () => {
    if (searchTerm.trim() !== "") {
      setDropdownOpen(true)
    }
  }

  return (
    <div className="mb-6">
      {/* Rótulo do campo com indicador de obrigatório */}
      <h3 className="text-lg font-medium text-gray-800 mb-3">{label}<span className="text-red-500">*</span></h3>

      {/* Área de exibição das tags selecionadas */}
      <div className="flex flex-wrap gap-2 mb-4 min-h-12 p-2 border-2 border-slate-200 rounded bg-gray-50">
        {itensSelecionados.length === 0 ? (
          // Mensagem quando nenhum item está selecionado
          <p className="text-gray-500 italic p-1">Nenhum selecionado</p>
        ) : (
          // Renderiza cada tag selecionada como um chip removível
          itensSelecionados.map((item) => (
            <div
              key={getId(item)}
              className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full flex items-center"
            >
              <span>{getNome(item)}</span>
              {/* Botão para remover a tag */}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="ml-2 p-0 h-auto text-indigo-600 hover:text-indigo-800"
                onClick={() => removeItem(getId(item))}
                aria-label={`Remover ${getNome(item)}`}
              >
                <XIcon size={16} weight="bold" />
              </Button>
            </div>
          ))
        )}
      </div>

      {/* Campo de busca com sugestões */}
      <div className="relative">
        <SearchInput
          value={searchTerm}
          onChange={handleSearchChange}
          onClick={handleInputClick}
          placeholder={`Buscar ${label.toLowerCase()}...`}
          suggestions={itensSugeridos}
          onSelectSuggestion={handleSelecionarItem}
          className="border-slate-700"
        />
      </div>

      {/* Área de mensagens informativas e de erro */}
      <p className="mt-2 text-sm text-gray-600">
        Digite para buscar e selecionar. Clique no X para remover um selecionado.
      </p>

      {/* Exibe mensagem de erro se houver */}
      {errors?.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
    </div>
  );
}

export default TagInput;
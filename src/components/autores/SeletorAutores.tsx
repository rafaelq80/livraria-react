import { X } from "@phosphor-icons/react"
import Autor from "../../models/Autor"
import { useSeletorAutores } from "../../hooks/seletorautores/useSeletorAutores"
import SearchInput from "../ui/SearchInput"

interface SeletorAutoresProps {
  autoresDisponiveis: Autor[]
  autoresSelecionados: Autor[]
  setAutoresSelecionados: (autores: Autor[]) => void
  errors?: {
    message?: string
  }
}

function SeletorAutores({
  autoresDisponiveis,
  autoresSelecionados,
  setAutoresSelecionados,
  errors,
}: SeletorAutoresProps) {
  const {
    searchTerm,
    dropdownOpen,
    filteredAuthors,
    addAuthor,
    removeAuthor,
    handleSearchChange,
    setDropdownOpen
  } = useSeletorAutores({
    autoresDisponiveis,
    autoresSelecionados,
    setAutoresSelecionados,
  })

  /**
   * Converte a lista de autores selecionados em um array do tipo string
   * exibe a lista somente se o dropdown estiver aberto
   */
  const autoresSugeridos = dropdownOpen && searchTerm.trim() !== "" 
    ? filteredAuthors.map(author => author.nome)
    : [];
  
  /**
   * Seleciona o autor da lista de sugestões, através do click do mouse
   * Localiza se existe na lista de autores previamente filtrada (autores disponíveis)
   * Se existir, adiciona na lista de autores selecionados (AddAuthor)
   */
  const handleSelecionarAutor = (suggestion: string) => {
    const selectedAuthor = filteredAuthors.find(author => author.nome === suggestion);
    if (selectedAuthor) {
      addAuthor(selectedAuthor);
    }
  };

  /**
   * Manipulador de eventos que abre o dropdown ao clicar no input
   * caso exista algum texto digitado
   */
  const handleInputClick = () => {
    if (searchTerm.trim() !== "") {
      setDropdownOpen(true);
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-gray-800 mb-3">Autores<span className="text-red-500">*</span></h3>

      {/* Área de autores selecionados - chips/tags */}
      <div className="flex flex-wrap gap-2 mb-4 min-h-12 p-2 border-2 border-slate-200 rounded bg-gray-50">
        {autoresSelecionados.length === 0 ? (
          <p className="text-gray-500 italic p-1">Nenhum autor selecionado</p>
        ) : (
          autoresSelecionados.map((author) => (
            <div
              key={author.id}
              className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full flex items-center"
            >
              <span>{author.nome}</span>
              <button
                type="button"
                className="ml-2 text-indigo-600 hover:text-indigo-800 focus:outline-none"
                onClick={() => removeAuthor(author.id)}
                aria-label={`Remover autor ${author.nome}`}
              >
                <X size={16} weight="bold" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Use SearchInput with controlled suggestions */}
      <div className="relative">
        <SearchInput
          value={searchTerm}
          onChange={handleSearchChange}
          onClick={handleInputClick}
          placeholder="Buscar autor..."
          suggestions={autoresSugeridos}
          onSelectSuggestion={handleSelecionarAutor}
          className="border-slate-700"
        />
      </div>

      {/* Mensagens de ajuda e erro */}
      <p className="mt-2 text-sm text-gray-600">
        Digite para buscar e selecionar autores. Clique no X para remover um autor
        selecionado.
      </p>

      {errors?.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
    </div>
  )
}

export default SeletorAutores
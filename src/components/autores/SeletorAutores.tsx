// SeletorAutores.tsx
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import Autor from "../../models/Autor";
import { useSeletorAutores } from "../../hooks/seletorautores/useSeletorAutores";

// Props para o componente de seleção de autores
interface SeletorAutoresProps {
  availableAutores: Autor[];
  selectedAutores: Autor[];
  setSelectedAutores: (autores: Autor[]) => void;
  errors?: {
    message?: string;
  };
}

function SeletorAutores({ 
  availableAutores, 
  selectedAutores, 
  setSelectedAutores,
  errors
}: SeletorAutoresProps) {
  // Usando o custom hook
  const {
    searchTerm,
    dropdownOpen,
    filteredAuthors,
    addAuthor,
    removeAuthor,
    handleDropdownClick,
    handleSearchChange
  } = useSeletorAutores({
    availableAutores,
    selectedAutores,
    setSelectedAutores
  });
  
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-gray-800 mb-3">Autores</h3>
      
      {/* Área de autores selecionados - chips/tags */}
      <div className="flex flex-wrap gap-2 mb-4 min-h-12 p-2 border-2 border-slate-200 rounded bg-gray-50">
        {selectedAutores.length === 0 ? (
          <p className="text-gray-500 italic p-1">Nenhum autor selecionado</p>
        ) : (
          selectedAutores.map(author => (
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
      
      {/* Campo de busca e seleção com autocomplete */}
      <div className="relative">
        <div className="flex relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MagnifyingGlass size={18} className="text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Buscar autor..."
            value={searchTerm}
            onChange={handleSearchChange}
            onClick={handleDropdownClick}
            className="w-full pl-10 border-2 border-slate-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Buscar autor"
            aria-expanded={dropdownOpen}
            aria-controls="authors-dropdown"
          />
        </div>
        
        {dropdownOpen && searchTerm && filteredAuthors.length > 0 && (
          <div 
            id="authors-dropdown"
            className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
            onClick={handleDropdownClick}
          >
            {filteredAuthors.map(author => (
              <button
                key={author.id}
                type="button"
                className="w-full text-left px-4 py-2 hover:bg-indigo-50 transition-colors duration-150"
                onClick={() => addAuthor(author)}
              >
                {author.nome}
              </button>
            ))}
          </div>
        )}
        
        {dropdownOpen && searchTerm && filteredAuthors.length === 0 && (
          <div 
            className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg p-4 text-center text-gray-500"
            onClick={handleDropdownClick}
          >
            Nenhum autor encontrado
          </div>
        )}
      </div>
      
      {/* Mensagens de ajuda e erro */}
      <p className="mt-2 text-sm text-gray-600">
        Digite para buscar e selecionar autores. Clique no X para remover um autor selecionado.
      </p>
      
      {errors?.message && (
        <p className="text-red-500 text-sm mt-1">{errors.message}</p>
      )}
    </div>
  );
}

export default SeletorAutores;
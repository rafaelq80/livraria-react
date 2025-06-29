import { FormEvent } from "react";
import SearchInput from "../../../shared/components/ui/SearchInput";

interface SearchBarProps {
  titulo: string;
  setTitulo: (titulo: string) => void;
  buscarProdutos: (e: FormEvent<HTMLFormElement>) => void;
  onSearchSubmit?: () => void;
  suggestions?: string[];
  selectSuggestion?: (suggestion: string) => void;
}

function SearchBar({ 
  titulo, 
  setTitulo, 
  buscarProdutos, 
  onSearchSubmit,
  suggestions = [],
  selectSuggestion
}: SearchBarProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    buscarProdutos(e);
    onSearchSubmit?.(); // Fecha o menu mobile após a busca
  };

  const handleSelectSuggestion = (suggestion: string) => {
    selectSuggestion?.(suggestion);
    onSearchSubmit?.(); // Fecha o menu mobile após selecionar uma sugestão
  };

  return (
    <div className="w-full flex justify-center items-center relative text-black">
      <div className="flex justify-center w-full md:w-full lg:w-4/5">
        <SearchInput
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Informe o título do livro"
          onSubmit={handleSubmit}
          suggestions={suggestions}
          onSelectSuggestion={handleSelectSuggestion}
          ariaControls="search-suggestions"
          ariaExpanded={suggestions.length > 0}
          className="border-gray-300"
        />
      </div>
    </div>
  );
}

export default SearchBar;
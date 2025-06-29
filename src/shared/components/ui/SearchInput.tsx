import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { ChangeEvent, FormEvent, MouseEvent } from "react";
import Button from "./Button";

/**
 * Interface que define as propriedades do componente de busca
 */
interface SearchInputProps {
  /** Valor atual do campo de busca */
  value: string;
  /** Função chamada quando o valor do campo muda */
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  /** Função chamada quando o campo é clicado */
  onClick?: (e: MouseEvent<HTMLInputElement>) => void;
  /** Texto de placeholder do campo */
  placeholder: string;
  /** Função chamada quando o formulário é submetido */
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  /** Lista de sugestões para autocomplete */
  suggestions?: string[];
  /** Função chamada quando uma sugestão é selecionada */
  onSelectSuggestion?: (suggestion: string) => void;
  /** ID do elemento controlado pelo combobox (para acessibilidade) */
  ariaControls?: string;
  /** Indica se a lista de sugestões está expandida */
  ariaExpanded?: boolean;
  /** Classes CSS customizadas */
  className?: string;
}

/**
 * Componente de campo de busca com funcionalidades de:
 * - Autocomplete com sugestões
 * - Submissão de formulário
 * - Acessibilidade (ARIA)
 * - Ícone de busca integrado
 */
function SearchInput({
  value,
  onChange,
  onClick,
  placeholder,
  onSubmit,
  suggestions,
  onSelectSuggestion,
  ariaControls,
  ariaExpanded,
  className = ""
}: Readonly<SearchInputProps>) {
  
  /**
   * Manipula a submissão do formulário de busca
   * Previne o comportamento padrão e chama a função onSubmit
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  /**
   * Manipula o clique em uma sugestão
   * Chama a função onSelectSuggestion com a sugestão selecionada
   */
  const handleSuggestionClick = (suggestion: string) => {
    onSelectSuggestion?.(suggestion);
  };

  return (
    <div className="relative w-full">
      {/* Formulário de busca */}
      <form className="relative w-full" onSubmit={handleSubmit}>
        <div className="flex relative">
          {/* Ícone de busca (lupa) */}
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MagnifyingGlassIcon size={18} className="text-gray-500" />
          </div>
          
          {/* Campo de entrada principal */}
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onClick={onClick}
            className={`w-full pl-10 border-2 bg-white rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${className}`}
            aria-label={placeholder}
            role="combobox"
            aria-expanded={ariaExpanded}
            aria-controls={ariaControls}
          />
        </div>
      </form>

      {/* Lista dropdown de sugestões de autocomplete */}
      {suggestions && suggestions.length > 0 && (
        <div
          id="search-suggestions"
          className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
        >
          {/* Renderiza cada sugestão como um botão clicável */}
          {suggestions.map((suggestion) => (
            <Button
              key={suggestion}
              type="button"
              variant="ghost"
              size="sm"
              className="w-full text-left px-4 py-2 hover:bg-indigo-50 transition-colors duration-150 text-gray-800 justify-start"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchInput;
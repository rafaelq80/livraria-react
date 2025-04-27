import { MagnifyingGlass } from "@phosphor-icons/react";
import { ChangeEvent, FormEvent, MouseEvent } from "react";

interface SearchInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e: MouseEvent<HTMLInputElement>) => void;
  placeholder: string;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  suggestions?: string[];
  onSelectSuggestion?: (suggestion: string) => void;
  ariaControls?: string;
  ariaExpanded?: boolean;
  className?: string;
}

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
}: SearchInputProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSelectSuggestion?.(suggestion);
  };

  return (
    <div className="relative w-full">
      <form className="relative w-full" onSubmit={handleSubmit}>
        <div className="flex relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MagnifyingGlass size={18} className="text-gray-500" />
          </div>
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onClick={onClick}
            className={`w-full pl-10 border-2 bg-white rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${className}`}
            aria-label={placeholder}
            aria-expanded={ariaExpanded}
            aria-controls={ariaControls}
          />
        </div>
      </form>

      {/* Dropdown para sugestões de autocomplete */}
      {suggestions && suggestions.length > 0 && (
        <div
          id="search-suggestions"
          className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              className="w-full text-left px-4 py-2 hover:bg-indigo-50 transition-colors duration-150 text-gray-800"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchInput;
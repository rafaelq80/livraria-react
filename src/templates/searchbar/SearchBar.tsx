import { MagnifyingGlass } from "@phosphor-icons/react";
import { FormEvent, ChangeEvent } from "react";

interface SearchBarProps {
  titulo: string;
  setTitulo: (titulo: string) => void;
  buscarProdutos: (e: FormEvent<HTMLFormElement>) => void;
}

function SearchBar({ titulo, setTitulo, buscarProdutos }: SearchBarProps) {
  return (
    <div className="w-full flex justify-center md:flex-1 md:items-center relative text-black">
      <form className="flex justify-center w-full md:w-[75%]" onSubmit={buscarProdutos}>
        <input
          className="w-full px-4 py-2 border rounded-lg bg-white focus:outline-indigo-500 focus:ring-2 focus:ring-indigo-500"
          type="search"
          placeholder="Informe o título do livro"
          name="titulo"
          required
          value={titulo}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTitulo(e.target.value)}
        />
        <button
          type="submit"
          className="hover:border-indigo-300 border-2 rounded-lg w-10 h-10 font-medium text-sm text-white ms-2 flex items-center justify-center"
        >
          <MagnifyingGlass size={14} weight="bold" className="fill-white hover:fill-indigo-300" />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;

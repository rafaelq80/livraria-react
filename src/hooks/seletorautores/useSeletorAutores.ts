// useAutorSelector.ts
import { useState, useEffect, useMemo, useCallback } from "react";
import Autor from "../../models/Autor";

interface UseAutorSelectorProps {
  availableAutores: Autor[];
  selectedAutores: Autor[];
  setSelectedAutores: (autores: Autor[]) => void;
}

export function useSeletorAutores({
  availableAutores,
  selectedAutores,
  setSelectedAutores
}: UseAutorSelectorProps) {
  // Estado local
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Funções para adicionar e remover autores
  const addAuthor = useCallback((author: Autor) => {
    if (!selectedAutores.some(a => a.id === author.id)) {
      setSelectedAutores([...selectedAutores, author]);
    }
    setSearchTerm("");
    setDropdownOpen(false);
  }, [selectedAutores, setSelectedAutores]);
  
  const removeAuthor = useCallback((authorId: number) => {
    setSelectedAutores(selectedAutores.filter(a => a.id !== authorId));
  }, [selectedAutores, setSelectedAutores]);
  
  // Autores filtrados pela busca
  const filteredAuthors = useMemo(() => {
    return availableAutores
      .filter(a => !selectedAutores.some(sa => sa.id === a.id))
      .filter(a => a.nome.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice(0, 10); // Limita para os 10 primeiros resultados para performance
  }, [availableAutores, selectedAutores, searchTerm]);
  
  // Fecha o dropdown quando clica fora
  useEffect(() => {
    const handleClickOutside = () => setDropdownOpen(false);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Previne que o click no dropdown propague e feche imediatamente
  const handleDropdownClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);
  
  // Manipulador para mudanças no input de busca
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setDropdownOpen(true);
  }, []);

  return {
    searchTerm,
    setSearchTerm,
    dropdownOpen,
    setDropdownOpen,
    filteredAuthors,
    addAuthor,
    removeAuthor,
    handleDropdownClick,
    handleSearchChange
  };
}
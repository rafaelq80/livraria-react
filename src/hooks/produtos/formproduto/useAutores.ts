import { useState, useEffect, useMemo, useCallback } from "react";
import Autor from "../../../models/Autor";
import { useApi } from "./useApi";
import { debounce } from "lodash";

// Interface para o estado do hook
interface AutoresState {
  selectedAutores: Autor[];
  filtrarAutor: string;
}

export function useAutores() {
  // Estado de autores disponíveis
  const [autores, setAutores] = useState<Autor[]>([]);
  
  // Estado consolidado para a UI
  const [state, setState] = useState<AutoresState>({
    selectedAutores: [],
    filtrarAutor: "",
  });

  // Desestruturação do estado para facilitar o acesso
  const { selectedAutores, filtrarAutor } = state;
  
  // API helpers
  const { fetchData } = useApi<Autor>();

  // Função para atualizar parcialmente o estado
  const updateState = useCallback((updates: Partial<AutoresState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  // Carrega os autores apenas uma vez ao inicializar
  useEffect(() => {
    const loadAutores = async () => {
      const response = await fetchData("/autores");
      if (response.success && response.data) {
        setAutores(Array.isArray(response.data) ? response.data : []);
      }
    };
    
    loadAutores();
  }, [fetchData]);

  // Filtra autores disponíveis com useMemo para melhorar performance
  const availableAutores = useMemo(() => {
    return autores
      .filter((autor) => !selectedAutores.some((selected) => selected.id === autor.id))
      .filter((autor) => autor.nome.toUpperCase().includes(filtrarAutor.toUpperCase()));
  }, [autores, selectedAutores, filtrarAutor]);

  // Debounce para o filtro de autor - criado apenas uma vez
  const debouncedSetFiltrarAutor = useMemo(() => 
    debounce((value: string) => {
      updateState({ filtrarAutor: value });
    }, 300), 
    [updateState]
  );

  // Tratador de evento para filtro com debounce
  const handleFiltrarAutor = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      debouncedSetFiltrarAutor(e.target.value);
    },
    [debouncedSetFiltrarAutor]
  );

  // Função para redefinir o estado
  const resetAutores = useCallback(() => {
    updateState({
      selectedAutores: [],
      filtrarAutor: ""
    });
  }, [updateState]);

  // Exposição da função setSelectedAutores para uso externo
  const setSelectedAutores = useCallback(
    (value: React.SetStateAction<Autor[]>) => {
      const newValue = typeof value === 'function' 
        ? value(selectedAutores) 
        : value;
      
      updateState({ selectedAutores: newValue });
    },
    [selectedAutores, updateState]
  );

  return {
    availableAutores,
    selectedAutores,
    filtrarAutor,
    handleFiltrarAutor,
    setSelectedAutores,
    resetAutores,
  };
}
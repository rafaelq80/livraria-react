import { useState, useEffect, useMemo, useCallback } from "react";
import Autor from "../../../models/Autor";
import { useApi } from "./useApi";
import { debounce } from "lodash";

// Interface para o estado do hook
interface AutoresState {
  selectedAutores: Autor[];
  selectedAutorToAdd: string;
  selectedAutorToRemove: string;
  filtrarAutor: string;
}

// Interface de retorno do hook
interface UseAutoresReturn extends AutoresState {
  autores: Autor[];
  availableAutores: Autor[];
  handleFiltrarAutor: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddAutor: () => Promise<void>;
  handleRemoveAutor: () => void;
  handleSelectAutorToAdd: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSelectAutorToRemove: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  setSelectedAutores: React.Dispatch<React.SetStateAction<Autor[]>>;
  resetAutores: () => void;
}

export function useAutores(): UseAutoresReturn {
  // Estado consolidado
  const [autores, setAutores] = useState<Autor[]>([]);
  const [state, setState] = useState<AutoresState>({
    selectedAutores: [],
    selectedAutorToAdd: "",
    selectedAutorToRemove: "",
    filtrarAutor: "",
  });

  // Extraindo valores do estado para facilitar acesso
  const { selectedAutores, selectedAutorToAdd, selectedAutorToRemove, filtrarAutor } = state;
  
  // Funções para atualizar partes específicas do estado
  const updateState = useCallback((updates: Partial<AutoresState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  // API helpers
  const { fetchData } = useApi<Autor>();

  // Carrega todos os autores ao inicializar
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

  // Tratadores de eventos
  const handleFiltrarAutor = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      debouncedSetFiltrarAutor(e.target.value);
    },
    [debouncedSetFiltrarAutor]
  );

  const handleAddAutor = useCallback(async () => {
    if (!selectedAutorToAdd) return;

    const response = await fetchData(`/autores/${selectedAutorToAdd}`);
    if (response.success && response.data) {
      updateState({ 
        selectedAutores: [...selectedAutores, response.data],
        selectedAutorToAdd: ""
      });
    }
  }, [selectedAutorToAdd, fetchData, selectedAutores, updateState]);

  const handleRemoveAutor = useCallback(() => {
    if (!selectedAutorToRemove) return;

    updateState({
      selectedAutores: selectedAutores.filter(
        (autor) => autor.id.toString() !== selectedAutorToRemove
      ),
      selectedAutorToRemove: ""
    });
  }, [selectedAutorToRemove, selectedAutores, updateState]);

  const handleSelectAutorToAdd = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      updateState({ selectedAutorToAdd: e.target.value });
    }, 
    [updateState]
  );

  const handleSelectAutorToRemove = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      updateState({ selectedAutorToRemove: e.target.value });
    },
    [updateState]
  );

  // Função para redefinir o estado
  const resetAutores = useCallback(() => {
    updateState({
      selectedAutores: [],
      selectedAutorToAdd: "",
      selectedAutorToRemove: "",
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
    autores,
    availableAutores,
    selectedAutores,
    selectedAutorToAdd,
    selectedAutorToRemove,
    filtrarAutor,
    handleFiltrarAutor,
    handleAddAutor,
    handleRemoveAutor,
    handleSelectAutorToAdd,
    handleSelectAutorToRemove,
    setSelectedAutores,
    resetAutores,
  };
}
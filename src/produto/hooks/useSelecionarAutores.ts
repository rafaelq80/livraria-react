// useAutores refatorado
import { debounce } from "lodash";
import { useCallback, useMemo, useState } from "react";
import Autor from "../../autor/models/Autor";
import { useListarAutores } from "../../autor/hooks/useListarAutores";

interface AutoresState {
  selectedAutores: Autor[];
  filtrarAutor: string;
}

export function useSelecionarAutores() {
  
  // Utiliza o hook useListarAutores
  const { autores, isLoading, recarregarAutores } = useListarAutores();
  
  // Cria um estado para armazenar a lista de autores selecionados e o texto usado no filtro
  const [state, setState] = useState<AutoresState>({
    selectedAutores: [],
    filtrarAutor: "",
  });

  // Desestrutura o estado para facilitar o acesso
  const { selectedAutores, filtrarAutor } = state;
  
  /**
   * Função para atualizar partes do estado state
   * 
   * O tipo Partial do TypeScript torna todas as 
   * propriedades do tipo base (AutoresState) opcionais
   * 
   * ...prev: copia todas as propriedades do estado anterior
   * ...updates: sobrescreve apenas as propriedades fornecidas 
   * no objeto updates
   *  */ 
  const updateState = useCallback((updates: Partial<AutoresState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  /** 
   * Filtra a lista de autores disponíveis
   * 
   * Utiliza o useMemo para melhorar performance, 
   * executando filtro apenas quando for necessário
   * 
   * Primeiro filtro: remove autores já selecionados
   * 
   * Segundo filtro: mantém apenas autores cujo nome 
   * contém o texto de filtro (ignorando maiúsculas/minúsculas)
   * */ 
  const availableAutores = useMemo(() => {
    return autores
      .filter((autor) => !selectedAutores.some((selected) => selected.id === autor.id))
      .filter((autor) => autor.nome.toUpperCase().includes(filtrarAutor.toUpperCase()));
  }, [autores, selectedAutores, filtrarAutor]);

  /**
   * Cria uma função com debounce para atualizar o filtro 
   * com um atraso de 300ms
   * 
   * Evita que o filtro seja executado enquanto o 
   * usuário está digitando, gerando atualizações
   * desenecessárias
   */
  const debouncedSetFiltrarAutor = useMemo(() => 
    debounce((value: string) => {
      updateState({ filtrarAutor: value });
    }, 300), 
    [updateState]
  );

  // Manipulador de eventos para o campo de busca autor
  const handleFiltrarAutor = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      debouncedSetFiltrarAutor(e.target.value);
    },
    [debouncedSetFiltrarAutor]
  );

  // Limpa a lista de autores selecionados e o filtro
  const resetAutores = useCallback(() => {
    updateState({
      selectedAutores: [],
      filtrarAutor: ""
    });
  }, [updateState]);

  /** 
   * Atualiza a lista de autores selecionados, 
   * aceitando tanto um novo array quanto uma 
   * função que recebe o array atual
   * */ 
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
    isLoading,
    recarregarAutores
  };
}
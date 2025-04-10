import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Categoria from "../../../models/Categoria";
import Editora from "../../../models/Editora";
import Produto from "../../../models/Produto";
import { createProdutoFormData } from "../../../services/FormDataService";
import { SuccessHandlerService } from "../../../services/SuccessHandlerService";
import { ProdutoSchemaType, produtoSchema } from "../../../validations/ProdutoSchema";
import { useApi } from "./useApi";
import { useAutores } from "./useAutores";

// Valores padrão para o formulário
const DEFAULT_FORM_VALUES: ProdutoSchemaType = {
  id: 0,
  titulo: "",
  preco: 0,
  desconto: 0,
  isbn10: "",
  isbn13: "",
  foto: "",
  fotoFile: undefined,
  categoria: { id: 0, tipo: "" },
  editora: { id: 0, nome: "" },
  autores: [],
};

export function useFormProduto(produtoId?: string) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [editoras, setEditoras] = useState<Editora[]>([]);
  const [isFormLoading, setIsFormLoading] = useState<boolean>(true);
  const [lastProcessedId, setLastProcessedId] = useState<string | undefined>(undefined);

  // API hooks
  const { fetchData, updateData, createData } = useApi<Produto>();
  const { 
    selectedAutores, 
    setSelectedAutores, 
    availableAutores, 
    resetAutores 
  } = useAutores();

  // Configuração do React Hook Form com Zod
  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
    control,
  } = useForm<ProdutoSchemaType>({
    resolver: zodResolver(produtoSchema),
    defaultValues: DEFAULT_FORM_VALUES,
  });

  // Observa os valores do formulário
  const formValues = watch();

  // Handlers de sucesso para operações CRUD - Memoizado
  const successHandlers = useMemo(() => 
    SuccessHandlerService.createCrudHandlers<Produto>("Produto", {
      navigate,
      redirectTo: "/",
      resetForm: () => {
        reset();
        resetAutores();
      },
    }),
    [navigate, reset, resetAutores]
  );

  // Carrega dados iniciais de categorias e editoras
  useEffect(() => {
    const loadInitialData = async () => {
      const [categoriasResponse, editorasResponse] = await Promise.all([
        fetchData<Categoria[]>("/categorias"),
        fetchData<Editora[]>("/editoras")
      ]);

      if (categoriasResponse.success && categoriasResponse.data) {
        setCategorias(categoriasResponse.data);
      }

      if (editorasResponse.success && editorasResponse.data) {
        setEditoras(editorasResponse.data);
      }
    };

    loadInitialData();
  }, [fetchData]);

  // Carrega o produto quando o ID muda
  useEffect(() => {
    // Verifica se o ID já foi processado para evitar loops
    if (produtoId === lastProcessedId && !isFormLoading) {
      return;
    }

    setIsFormLoading(true);
    
    const loadProduto = async () => {
      // Modo de criação (sem ID)
      if (!produtoId) {
        reset({
          ...DEFAULT_FORM_VALUES,
          foto: "",
          fotoFile: undefined
        });
        resetAutores();
        
        setLastProcessedId(undefined);
        setIsFormLoading(false);
        return;
      }

      // Evita requisições desnecessárias
      if (produtoId === lastProcessedId) {
        setIsFormLoading(false);
        return;
      }

      // Modo de edição (com ID)
      const response = await fetchData<Produto>(`/produtos/${produtoId}`);
      
      if (!response.success || !response.data) {
        setIsFormLoading(false);
        setLastProcessedId(produtoId);
        return;
      }

      const produto = response.data;

      // Atualiza o formulário com os dados do produto
      reset({
        ...produto,
        categoria: produto.categoria || DEFAULT_FORM_VALUES.categoria,
        editora: produto.editora || DEFAULT_FORM_VALUES.editora,
        autores: produto.autores || [],
        fotoFile: undefined
      });

      // Atualiza os autores selecionados
      if (produto.autores?.length > 0) {
        setSelectedAutores(produto.autores);
      } else {
        resetAutores();
      }
      
      setLastProcessedId(produtoId);
      setIsFormLoading(false);
    };

    loadProduto();
  }, [produtoId, reset, fetchData, resetAutores, setSelectedAutores, lastProcessedId, isFormLoading]);

  // Sincroniza os autores selecionados com o formulário
  useEffect(() => {
    if (isFormLoading) return;
    
    const currentIds = (watch('autores') || []).map(a => a.id).sort().join(',');
    const selectedIds = selectedAutores.map(a => a.id).sort().join(',');
    
    if (currentIds !== selectedIds) {
      setValue("autores", selectedAutores, { shouldDirty: true });
    }
  }, [selectedAutores, setValue, watch, isFormLoading]);

  const retornar = () => {
    navigate("/")
  }
  
  // Handlers de mudança para campos de select
  const handleCategoriaChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const categoriaId = Number(e.target.value);
      const categoria = categorias.find((c) => c.id === categoriaId);
      if (categoria) {
        setValue("categoria", categoria);
      }
    },
    [categorias, setValue]
  );

  const handleEditoraChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const editoraId = Number(e.target.value);
      const editora = editoras.find((e) => e.id === editoraId);
      if (editora) {
        setValue("editora", editora);
      }
    },
    [editoras, setValue]
  );

  // Submissão do formulário
  const onSubmit = async (data: ProdutoSchemaType) => {
    setIsLoading(true);

    try {
      const produto: Produto = {
        id: produtoId ? Number(produtoId) : 0,
        titulo: data.titulo,
        preco: data.preco,
        desconto: data.desconto,
        foto: data.foto,
        isbn10: data.isbn10,
        isbn13: data.isbn13,
        autores: selectedAutores,
        categoria: {
          id: data.categoria.id,
          tipo: data.categoria.tipo || "",
        },
        editora: {
          id: data.editora.id,
          nome: data.editora.nome || "",
        },
      };

      const formData = createProdutoFormData(produto, data.fotoFile || null);
      
      const isEditing = Boolean(produtoId);
      const url = "/produtos";
      
      // Envia o FormData para a API
      const response = isEditing 
        ? await updateData<FormData>(url, formData as FormData)
        : await createData<FormData>(url, formData as FormData);
      
      if (response.success) {
        const handler = isEditing 
          ? successHandlers.handleUpdate(produtoId || '') 
          : successHandlers.handleCreate;
        handler();
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    errors,
    isLoading,
    categorias,
    editoras,
    selectedAutores,
    availableAutores,
    setSelectedAutores,
    handleCategoriaChange,
    handleEditoraChange,
    onSubmit: handleFormSubmit(onSubmit),
    retornar,
    formValues,
    control,
    setValue,
  };
}
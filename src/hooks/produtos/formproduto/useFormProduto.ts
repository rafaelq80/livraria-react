import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
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
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [editoras, setEditoras] = useState<Editora[]>([]);
  // Estado para controlar quando o formulário está sendo carregado inicialmente
  const [isFormLoading, setIsFormLoading] = useState<boolean>(true);
  // Estado para armazenar o último ID processado, evitando processamentos repetidos
  const [lastProcessedId, setLastProcessedId] = useState<string | undefined>(undefined);

  // Hooks
  const { fetchData, updateData, createData } = useApi<Produto>();
  const autorHook = useAutores();
  const { selectedAutores, setSelectedAutores, resetAutores } = autorHook;

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
      // Carregando categorias e editoras em paralelo
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

  // Atualização no useEffect que carrega o produto
  useEffect(() => {
    // Verifica se o ID já foi processado para evitar loops
    if (produtoId === lastProcessedId && !isFormLoading) {
      return;
    }
    
    // Marca o início do carregamento do formulário
    setIsFormLoading(true);
    
    const loadProduto = async () => {
      // Quando não há ID (modo de criação)
      if (!produtoId) {
        // Reset completo incluindo limpeza do campo de foto
        reset({
          ...DEFAULT_FORM_VALUES,
          foto: "",  // Explicitamente limpar a string da foto
          fotoFile: undefined  // Limpar o arquivo
        });
        resetAutores();
        
        // Atualiza o último ID processado
        setLastProcessedId(undefined);
        setIsFormLoading(false);
        return;
      }

      // Evita requisições desnecessárias se já estamos processando o mesmo ID
      if (produtoId === lastProcessedId) {
        setIsFormLoading(false);
        return;
      }

      // Carrega o produto pelo ID (modo de edição)
      const response = await fetchData<Produto>(`/produtos/${produtoId}`);
      
      if (!response.success || !response.data) {
        setIsFormLoading(false);
        setLastProcessedId(produtoId);
        return;
      }

      const produto = response.data;

      // Reseta o formulário com os dados do produto
      reset({
        ...produto,
        categoria: produto.categoria || DEFAULT_FORM_VALUES.categoria,
        editora: produto.editora || DEFAULT_FORM_VALUES.editora,
        autores: produto.autores || [],
        // Garantir que o fotoFile seja limpo para evitar problemas
        fotoFile: undefined
      });

      if (produto.autores?.length > 0) {
        setSelectedAutores(produto.autores);
      } else {
        // Reset autores quando não existirem autores no produto
        resetAutores();
      }
      
      // Atualiza o último ID processado e finaliza o carregamento
      setLastProcessedId(produtoId);
      setIsFormLoading(false);
    };

    loadProduto();
  }, [produtoId, reset, fetchData, resetAutores, setSelectedAutores, lastProcessedId, isFormLoading]);

  // Sincroniza os autores selecionados com o formulário
  useEffect(() => {
    // Verifica se os IDs dos autores são diferentes antes de atualizar
    if (isFormLoading) return; // Evita atualizações durante o carregamento inicial
    
    const currentIds = (watch('autores') || []).map(a => a.id).sort().join(',');
    const selectedIds = selectedAutores.map(a => a.id).sort().join(',');
    
    if (currentIds !== selectedIds) {
      setValue("autores", selectedAutores, { shouldDirty: true });
    }
  }, [selectedAutores, setValue, watch, isFormLoading]);

  // Handlers de mudança para categoria e editora
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

  // Submissão do formulário - Simplificada
  const onSubmit = async (data: ProdutoSchemaType) => {
    setIsLoading(true);

    try {

      const produto: Produto = {
        id: id ? Number(id) : 0,
        titulo: data.titulo,
        preco: data.preco,
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

      const formData = createProdutoFormData(produto, data.fotoFile || null)
      
      const isEditing = Boolean(produtoId);
      const url = "/produtos";
      
      // Envia o FormData para a API
      const response = isEditing 
        ? await updateData<FormData>(url, formData as FormData)
        : await createData<FormData>(url, formData as FormData);
      
      if (response.success) {
        const handler = isEditing ? 
          successHandlers.handleUpdate(id || '') : 
          successHandlers.handleCreate;
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
    ...autorHook,
    handleCategoriaChange,
    handleEditoraChange,
    onSubmit: handleFormSubmit(onSubmit),
    formValues,
    control,  // Exportando o control para uso com o CampoFoto
    setValue,  // Exportando setValue para uso com o CampoFoto
  };
}
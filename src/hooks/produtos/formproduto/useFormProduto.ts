import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import Categoria from "../../../models/Categoria"
import Editora from "../../../models/Editora"
import Produto from "../../../models/Produto"
import { SuccessHandlerService } from "../../../services/SuccessHandlerService"
import { ProdutoSchemaType, produtoSchema } from "../../../validations/ProdutoSchema"
import { useApi } from "./useApi"
import { useAutores } from "./useAutores"

export function useFormProduto(produtoId?: string) {
	const navigate = useNavigate()
	const { id } = useParams<{ id: string }>()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [categorias, setCategorias] = useState<Categoria[]>([])
	const [editoras, setEditoras] = useState<Editora[]>([])

	// Inicializa o hook de autores
	const autorHook = useAutores()
	const { selectedAutores, setSelectedAutores, resetAutores } = autorHook

	// Inicializa o hook de API
	const { fetchData, updateData, createData } = useApi<Produto>()

	// Configuração do React Hook Form com Zod
	const {
		register,
		handleSubmit: handleFormSubmit,
		formState: { errors },
		setValue,
		watch,
		reset,
	} = useForm<ProdutoSchemaType>({
		resolver: zodResolver(produtoSchema),
		defaultValues: {
			id: 0,
			titulo: "",
			preco: 0,
			isbn10: "",
			isbn13: "",
			foto: "",
			categoria: { id: 0, tipo: "" },
			editora: { id: 0, nome: "" },
			autores: [],
		},
	})

	// Cria handlers de sucesso para operações CRUD de produtos
	const { handleCreate, handleUpdate } = SuccessHandlerService.createCrudHandlers<Produto>(
		"Produto",
		{
			navigate,
			redirectTo: "/",
			resetForm: () => {
				reset()
				resetAutores()
			},
		}
	)

	// Observa os valores do formulário
	const formValues = watch()

	// Carrega dados iniciais de categorias e editoras
	useEffect(() => {
		const loadInitialData = async () => {
			const categoriasData = await fetchData<Categoria[]>("/categorias")
			if (categoriasData) setCategorias(categoriasData)

			const editorasData = await fetchData<Editora[]>("/editoras")
			if (editorasData) setEditoras(editorasData)
		}

		loadInitialData()
	}, [fetchData])

	// Busca produto por ID quando em modo de edição
	useEffect(() => {
		const loadProduto = async () => {
			if (produtoId === undefined) {
				reset({
					id: 0,
					titulo: "",
					preco: 0,
					isbn10: "",
					isbn13: "",
					foto: "",
					categoria: { id: 0, tipo: "" },
					editora: { id: 0, nome: "" },
					autores: [],
				})
				resetAutores()
				return
			}

			const produto = await fetchData<Produto>(`/produtos/${produtoId}`)
			if (!produto) return

			reset({
				...produto,
				categoria: produto.categoria || { id: 0, tipo: "" },
				editora: produto.editora || { id: 0, nome: "" },
				autores: produto.autores || [],
			})

			if (produto.autores && produto.autores.length > 0) {
				setSelectedAutores(produto.autores)
			}
		}

		loadProduto()
	}, [produtoId, reset, fetchData, resetAutores, setSelectedAutores])

	// Atualiza o campo de autores no formulário quando a lista muda
	useEffect(() => {
		setValue("autores", selectedAutores)
	}, [selectedAutores, setValue])

	// Otimizado: Busca categoria e editora a partir do cache local
	const handleCategoriaChange = useCallback(
		(e: React.ChangeEvent<HTMLSelectElement>) => {
			const categoriaId = Number(e.target.value)
			const categoria = categorias.find((c) => c.id === categoriaId)
			if (categoria) {
				setValue("categoria", categoria)
			}
		},
		[categorias, setValue]
	)

	const handleEditoraChange = useCallback(
		(e: React.ChangeEvent<HTMLSelectElement>) => {
			const editoraId = Number(e.target.value)
			const editora = editoras.find((e) => e.id === editoraId)
			if (editora) {
				setValue("editora", editora)
			}
		},
		[editoras, setValue]
	)

	// Submissão do formulário
	const onSubmit = async (data: ProdutoSchemaType) => {
		setIsLoading(true)

		try {
			const categoria: Categoria = {
				id: data.categoria.id,
				tipo: data.categoria.tipo || "",
			}

			const editora: Editora = {
				id: data.editora.id,
				nome: data.editora.nome || "",
			}

			const produto: Produto = {
				id: id ? Number(id) : 0,
				titulo: data.titulo,
				preco: data.preco,
				foto: data.foto,
				isbn10: data.isbn10,
				isbn13: data.isbn13,
				autores: selectedAutores,
				categoria: categoria,
				editora: editora,
			}

			const acao = produtoId ? updateData : createData
			const onSuccess = id ? handleUpdate(id) : handleCreate

			await acao<Produto>(`/produtos`, produto)
			onSuccess()
		} finally {
			setIsLoading(false)
		}
	}

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
	}
}

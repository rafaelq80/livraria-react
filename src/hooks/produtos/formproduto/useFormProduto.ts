import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import Categoria from "../../../models/Categoria"
import Editora from "../../../models/Editora"
import Produto from "../../../models/Produto"
import { listar, atualizar, cadastrar } from "../../../services/AxiosService"
import { createProdutoFormData } from "../../../services/FormDataService"
import { ErrorHandlerService } from "../../../services/ErrorHandlerService"
import { SuccessHandlerService } from "../../../services/SuccessHandlerService"
import { ProdutoSchemaType, produtoSchema } from "../../../validations/ProdutoSchema"
import { useAuth } from "../../../store/AuthStore"
import { useSelecionarAutores } from "./useSelecionarAutores"

// Valores padrão para o formulário
const DEFAULT_FORM_VALUES: ProdutoSchemaType = {
	id: 0,
	titulo: "",
	descricao: "",
	preco: 0,
	desconto: 0,
	isbn10: "",
	isbn13: "",
	paginas: 0,
	idioma: "",
	foto: "",
	fotoFile: undefined,
	categoria: { id: 0, tipo: "" },
	editora: { id: 0, nome: "" },
	autores: [],
}

export function useFormProduto(produtoId?: string) {
	const navigate = useNavigate()
	const { usuario, handleLogout } = useAuth()
	const token = usuario.token

	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [categorias, setCategorias] = useState<Categoria[]>([])
	const [editoras, setEditoras] = useState<Editora[]>([])
	const [isFormLoading, setIsFormLoading] = useState<boolean>(true)
	const [lastProcessedId, setLastProcessedId] = useState<string | undefined>(undefined)

	// Usando diretamente useAutores sem useApi
	const { selectedAutores, setSelectedAutores, availableAutores, resetAutores } =
		useSelecionarAutores()

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
	})

	const formValues = watch()

	// Handlers de sucesso para operações CRUD - Memoizado
	const successHandlers = useMemo(
		() =>
			SuccessHandlerService.createCrudHandlers<Produto>("Produto", {
				navigate,
				redirectTo: "/",
				resetForm: () => {
					reset()
					resetAutores()
				},
			}),
		[navigate, reset, resetAutores]
	)

	// Carrega dados iniciais de categorias e editoras diretamente com AxiosService
	useEffect(() => {
		const loadInitialData = async () => {
			try {
				const [categoriasData, editorasData] = await Promise.all([
					listar<Categoria[]>("/categorias", token),
					listar<Editora[]>("/editoras", token),
				])

				setCategorias(categoriasData)
				setEditoras(editorasData)
			} catch (error) {
				ErrorHandlerService.handleError(error, { handleLogout })
			}
		}

		loadInitialData()
	}, [token, handleLogout])

	// Carrega o produto quando o ID muda
	useEffect(() => {
		// Verifica se o ID já foi processado para evitar loops
		if (produtoId === lastProcessedId && !isFormLoading) {
			return
		}

		setIsFormLoading(true)

		const loadProduto = async () => {
			// Modo de criação (sem ID)
			if (!produtoId) {
				reset({
					...DEFAULT_FORM_VALUES,
					foto: "",
					fotoFile: undefined,
				})
				resetAutores()

				setLastProcessedId(undefined)
				setIsFormLoading(false)
				return
			}

			// Evita requisições desnecessárias
			if (produtoId === lastProcessedId) {
				setIsFormLoading(false)
				return
			}

			// Modo de edição (com ID)
			try {
				const produto = await listar<Produto>(`/produtos/${produtoId}`, token)

				// Atualiza o formulário com os dados do produto
				reset({
					...produto,
					categoria: produto.categoria || DEFAULT_FORM_VALUES.categoria,
					editora: produto.editora || DEFAULT_FORM_VALUES.editora,
					autores: produto.autores || [],
					fotoFile: undefined,
				})

				// Atualiza os autores selecionados
				if (produto.autores?.length > 0) {
					setSelectedAutores(produto.autores)
				} else {
					resetAutores()
				}
			} catch (error) {
				ErrorHandlerService.handleError(error, { handleLogout })
			} finally {
				setLastProcessedId(produtoId)
				setIsFormLoading(false)
			}
		}

		loadProduto()
	}, [
		produtoId,
		reset,
		token,
		handleLogout,
		resetAutores,
		setSelectedAutores,
		lastProcessedId,
		isFormLoading,
	])

	// Sincroniza os autores selecionados com o formulário
	useEffect(() => {
		if (isFormLoading) return

		const currentIds = (watch("autores") || [])
			.map((a) => a.id)
			.sort()
			.join(",")
		const selectedIds = selectedAutores
			.map((a) => a.id)
			.sort()
			.join(",")

		if (currentIds !== selectedIds) {
			setValue("autores", selectedAutores, { shouldDirty: true })
		}
	}, [selectedAutores, setValue, watch, isFormLoading])

	const retornar = () => {
		navigate("/listarprodutos")
	}

	// Handlers de mudança para campos de select
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

	// Submissão do formulário - substituindo useApi por chamadas diretas
	const onSubmit = async (data: ProdutoSchemaType) => {
		setIsLoading(true)

		try {
			const produto: Produto = {
				id: produtoId ? Number(produtoId) : 0,
				titulo: data.titulo,
				descricao: data.descricao,
				preco: data.preco,
				desconto: data.desconto,
				foto: data.foto,
				isbn10: data.isbn10,
				isbn13: data.isbn13,
				paginas: data.paginas,
				idioma: data.idioma,
				autores: selectedAutores,
				categoria: {
					id: data.categoria.id,
					tipo: data.categoria.tipo || "",
				},
				editora: {
					id: data.editora.id,
					nome: data.editora.nome || "",
				},
			}

			const formData = createProdutoFormData(produto, data.fotoFile || null)

			// Adicionando o código para exibir o formData no console
			console.log("FormData que será enviado:")
			for (const pair of formData.entries()) {
				console.log(pair[0] + ": " + pair[1])
			}

			const isEditing = Boolean(produtoId)
			const url = "/produtos"

			// Envia o FormData para a API
			if (isEditing) {
				await atualizar<FormData>(url, formData as FormData, token)
				successHandlers.handleUpdate(produtoId || "")()
			} else {
				await cadastrar<FormData>(url, formData as FormData, token)
				successHandlers.handleCreate()
			}
		} catch (error) {
			ErrorHandlerService.handleError(error, {
				errorMessage: "Erro ao salvar o produto!",
				handleLogout,
			})
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
	}
}

import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import Produto from "../models/Produto"
import { listar, atualizar, cadastrar } from "../../services/AxiosService"
import { criarProdutoFormData } from "../../shared/services/FormDataService"
import { ErrorHandlerService } from "../../shared/handlers/ErrorHandlerService"
import { SuccessHandlerService } from "../../shared/handlers/SuccessHandlerService"
import { ProdutoSchemaType, produtoSchema } from "../validations/ProdutoSchema"
import { useAuth } from "../../shared/store/AuthStore"
import { useSelecionarAutores } from "./useSelecionarAutores"
import Categoria from "../../categoria/models/Categoria"
import Editora from "../../editora/models/Editora"
import { useSanitizedForm } from "../../shared/hooks/sanitized/useSanitizedForm"
import CriarProdutoDto, { AutorIdDto, CategoriaIdDto, EditoraIdDto } from "../dtos/CriarProdutoDto"

// Valores padrão para o formulário
const DEFAULT_FORM_VALUES: ProdutoSchemaType = {
	id: 0,
	titulo: "",
	sinopse: "",
	preco: 0,
	desconto: 0,
	isbn10: "",
	isbn13: "",
	paginas: 1,
	edicao: 1,
	idioma: "Português",
	anoPublicacao: new Date().getFullYear(),
	foto: "",
	fotoFile: undefined,
	categoria: { id: 0, tipo: "" },
	editora: { id: 0, nome: "" },
	autores: [],
}

// DTO para atualização
interface AtualizarProdutoDto extends CriarProdutoDto {
	id: number
}

export function useFormProduto(produtoId?: string) {
	const navigate = useNavigate()
	const { handleLogout } = useAuth()


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
	} = useSanitizedForm<ProdutoSchemaType>({
		resolver: zodResolver(produtoSchema),
		defaultValues: DEFAULT_FORM_VALUES,
	}, {
		sanitizeStrings: true,
		sanitizeNumbers: true,
		sanitizeEmails: false,
		sanitizeNames: true,
	})

	const formValues = watch()

	// Handlers de sucesso para operações CRUD - Memoizado
	const successHandlers = useMemo(
		() =>
			SuccessHandlerService.createCrudHandlers<Produto>("produto", {
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
					listar<Categoria[]>("/categorias"),
					listar<Editora[]>("/editoras"),
				])

				setCategorias(categoriasData)
				setEditoras(editorasData)
			} catch (error) {
				ErrorHandlerService.handleError(error, { handleLogout })
			}
		}

		loadInitialData()
	}, [handleLogout])

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
				const produto = await listar<Produto>(`/produtos/${produtoId}`)

				// Atualiza o formulário com os dados do produto
				reset({
					...produto,
					categoria: produto.categoria ?? DEFAULT_FORM_VALUES.categoria,
					editora: produto.editora ?? DEFAULT_FORM_VALUES.editora,
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
			.sort((a, b) => (a - b))
			.join(",")
		const selectedIds = selectedAutores
			.map((a) => a.id)
			.sort((a, b) => (a - b))
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
			// Mapeia autores para apenas os IDs
			const autoresIds: AutorIdDto[] = selectedAutores.map(a => ({ id: a.id }))
			const categoriaId: CategoriaIdDto = { id: data.categoria.id }
			const editoraId: EditoraIdDto = { id: data.editora.id }

			if (produtoId) {
				// Atualização
				const atualizarProduto: AtualizarProdutoDto = {
					id: Number(produtoId),
					titulo: data.titulo,
					sinopse: data.sinopse,
					preco: Number(Math.max(0, data.preco).toFixed(2)),
					desconto: data.desconto || 0,
					isbn10: data.isbn10,
					isbn13: data.isbn13,
					paginas: data.paginas,
					edicao: data.edicao,
					idioma: data.idioma || "Português",
					anoPublicacao: data.anoPublicacao,
					foto: data.foto,
					autores: autoresIds,
					categoria: categoriaId,
					editora: editoraId,
				}
				const formData = criarProdutoFormData(atualizarProduto, data.fotoFile || null)
				await atualizar<FormData>("/produtos", formData)
				successHandlers.handleUpdate(produtoId ?? "")()
			} else {
				// Criação
				const criarProduto: CriarProdutoDto = {
					titulo: data.titulo,
					sinopse: data.sinopse,
					preco: Number(Math.max(0, data.preco).toFixed(2)),
					desconto: data.desconto || 0,
					isbn10: data.isbn10,
					isbn13: data.isbn13,
					paginas: data.paginas,
					edicao: data.edicao,
					idioma: data.idioma || "Português",
					anoPublicacao: data.anoPublicacao,
					foto: data.foto,
					autores: autoresIds,
					categoria: categoriaId,
					editora: editoraId,
				}
				const formData = criarProdutoFormData(criarProduto, data.fotoFile || null)
				await cadastrar<FormData>("/produtos", formData)
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

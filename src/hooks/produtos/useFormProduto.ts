import { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import AuthContext from "../../contexts/AuthContext"
import Autor from "../../models/Autor"
import Categoria from "../../models/Categoria"
import Editora from "../../models/Editora"
import Produto from "../../models/Produto"
import { listar, atualizar, cadastrar } from "../../services/AxiosService"
import { ToastAlerta } from "../../utils/ToastAlerta"
import { produtoSchema, ProdutoSchemaType } from "../../validations/ProdutoSchema"

export function useFormProduto(produtoId?: string) {
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [categorias, setCategorias] = useState<Categoria[]>([])
	const [editoras, setEditoras] = useState<Editora[]>([])
	const [autores, setAutores] = useState<Autor[]>([])
	const [availableAutores, setAvailableAutores] = useState<Autor[]>([])
	const [selectedAutores, setSelectedAutores] = useState<Autor[]>([])
	const [selectedAutorToAdd, setSelectedAutorToAdd] = useState<string>("")
	const [selectedAutorToRemove, setSelectedAutorToRemove] = useState<string>("")
	const [filtrarAutor, setFiltrarAutor] = useState<string>("")

	const { usuario, handleLogout } = useContext(AuthContext)
	const token = usuario.token

    const { id } = useParams<{ id: string }>()
    
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

	// Observa os valores do formulário para sincronização
	const formValues = watch()

	const handleError = (error: unknown) => {
		if (typeof error === "string" && error.includes("401")) handleLogout()
		else ToastAlerta("Erro ao carregar dados!", "erro")
	}

	async function fetchData<T>(url: string, setDados: React.Dispatch<React.SetStateAction<T>>) {
		try {
			const resposta = await listar<T>(url, token)
			setDados(resposta)
		} catch (error: unknown) {
			handleError(error)
		}
	}

	async function buscarProdutoPorId(id: string) {
		try {
			const resposta = await listar<Produto>(`/produtos/${id}`, token)

			// Preenche o formulário com os dados do produto
			reset({
				...resposta,
				categoria: resposta.categoria || { id: 0 },
				editora: resposta.editora || { id: 0 },
				autores: resposta.autores || [],
			})

			// Atualiza a lista de autores selecionados
			if (resposta.autores && resposta.autores.length > 0) {
				setSelectedAutores(resposta.autores)
			}

			return resposta
		} catch (error: unknown) {
			handleError(error)
			return null
		}
	}

	async function buscarAutorPorId(id: string) {
		try {
			const resposta = await listar<Autor>(`/autores/${id}`, token)
			return resposta
		} catch (error: unknown) {
			if (typeof error === "string" && error.includes("401")) handleLogout()
			return null
		}
	}

	// Carregamento dos dados iniciais
	useEffect(() => {
		fetchData<Autor[]>("/autores", setAutores)
		fetchData<Categoria[]>("/categorias", setCategorias)
		fetchData<Editora[]>("/editoras", setEditoras)

		if (produtoId !== undefined) {
			buscarProdutoPorId(produtoId)
		}
	}, [produtoId])

	// Filtragem dos autores disponíveis
	useEffect(() => {
		const filteredAuthors = autores
			.filter((autor) => !selectedAutores.some((selected) => selected.id === autor.id))
			.filter((autor) => autor.nome.toUpperCase().includes(filtrarAutor.toUpperCase()))

		setAvailableAutores(filteredAuthors)
	}, [autores, selectedAutores, filtrarAutor])

	// Atualiza o campo de autores do formulário quando a lista de autores selecionados muda
	useEffect(() => {
		setValue("autores", selectedAutores)
	}, [selectedAutores, setValue])

	const handleFiltrarAutor = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFiltrarAutor(e.target.value)
	}

	const handleAddAutor = async () => {
		if (selectedAutorToAdd) {
			const autor = await buscarAutorPorId(selectedAutorToAdd)
			if (autor) {
				setSelectedAutores((prev) => [...prev, autor])
				setSelectedAutorToAdd("")
			}
		}
	}

	const handleRemoveAutor = () => {
		if (selectedAutorToRemove) {
			setSelectedAutores((prev) =>
				prev.filter((autor) => autor.id.toString() !== selectedAutorToRemove)
			)
			setSelectedAutorToRemove("")
		}
	}

	const handleSelectAutorToAdd = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedAutorToAdd(e.target.value)
	}

	const handleSelectAutorToRemove = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedAutorToRemove(e.target.value)
	}

	const handleCategoriaChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedId = Number(e.target.value)
		if (selectedId) {
			try {
				const resposta = await listar<Categoria>(`/categorias/${selectedId}`, token)
				setValue("categoria", resposta)
			} catch (error) {
				handleError(error)
			}
		}
	}

	const handleEditoraChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedId = Number(e.target.value)
		if (selectedId) {
			try {
				const resposta = await listar<Editora>(`/editoras/${selectedId}`, token)
				setValue("editora", resposta)
			} catch (error) {
				handleError(error)
			}
		}
	}

	const onSubmit = async (data: ProdutoSchemaType) => {
		setIsLoading(true)
		try {

            const categoria: Categoria = {
                id: data.categoria.id,
                tipo: data.categoria.tipo || "" // Ensure tipo is never undefined
              };
              
              const editora: Editora = {
                id: data.editora.id,
                nome: data.editora.nome || "" // Ensure nome is never undefined
              };
            
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
			if (produtoId) {
				await atualizar<Produto>("/produtos", produto, token)
			} else {
				await cadastrar<Produto>("/produtos", produto, token)
			}

			ToastAlerta(`Produto ${produtoId ? "atualizado" : "cadastrado"} com sucesso`, "sucesso")
			navigate("/")
		} catch (error) {
			handleError(error)
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
		handleCategoriaChange,
		handleEditoraChange,
		onSubmit: handleFormSubmit(onSubmit),
		formValues,
	}
}

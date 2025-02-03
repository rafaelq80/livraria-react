import { ChangeEvent, useContext, useEffect, useState } from "react"
import { RotatingLines } from "react-loader-spinner"
import { useNavigate, useParams } from "react-router-dom"

import { atualizar, cadastrar, listar } from "../../../services/AxiosService"

import { AuthContext } from "../../../contexts/AuthContext"
import Autor from "../../../models/Autor"
import Categoria from "../../../models/Categoria"
import Editora from "../../../models/Editora"
import Produto from "../../../models/Produto"
import { ToastAlerta } from "../../../utils/ToastAlerta"
import { ArrowFatLeft, ArrowFatRight } from "@phosphor-icons/react"

function FormProduto() {
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [categorias, setCategorias] = useState<Categoria[]>([])
	const [editoras, setEditoras] = useState<Editora[]>([])
	const [autores, setAutores] = useState<Autor[]>([])
	const [selectedAutores, setSelectedAutores] = useState<Autor[]>([])
	const [availableAutores, setAvailableAutores] = useState<Autor[]>([])
	const [selectedAutorToAdd, setSelectedAutorToAdd] = useState<string>("")
	const [selectedAutorToRemove, setSelectedAutorToRemove] = useState<string>("")
	const [filtrarAutor, setFiltrarAutor] = useState<string>("")

	const [categoria, setCategoria] = useState<Categoria>({
		id: 0,
		tipo: "",
	})

	const [editora, setEditora] = useState<Editora>({
		id: 0,
		nome: "",
	})

	const [produto, setProduto] = useState<Produto>({} as Produto)

	const { id } = useParams<{ id: string }>()
	const { usuario, handleLogout } = useContext(AuthContext)
	const token = usuario.token

	const handleError = (error: any) => {
		if (error.toString().includes("401")) handleLogout()
		else ToastAlerta("Erro ao carregar dados!", "erro")
	}

  function resetarFormulario() {
    setProduto({
      id: 0,
      titulo: "",
      preco: 0,
      isbn10: "",
      isbn13: "",
      foto: "",
      categoria: {} as Categoria,
      editora: {} as Editora,
      autores: [],
    });
    setCategoria({} as Categoria);
    setEditora({} as Editora);
    setSelectedAutores([]);
  }
  

	const fetchData = async (url: string, setter: Function) => {
		try {
			await listar(url, setter, { headers: { Authorization: token } })
		} catch (error: any) {
			handleError(error)
		}
	}

	async function buscarProdutoPorId(id: string) {
		try {
			await listar(
				`/produtos/${id}`,
				(produto: Produto) => {
					setProduto(produto)
					setCategoria(produto.categoria ?? null)
					setEditora(produto.editora ?? null)
					setSelectedAutores(produto.autores ?? [])
				},
				{
					headers: { Authorization: token },
				}
			)
		} catch (error: any) {
			handleError(error)
		}
	}

	async function buscarAutorPorId(id: string) {
		try {
			const buscaAutor = { id: 0, nome: "", nacionalidade: "" }

			await listar(
				`/autores/${id}`,
				(autor: Autor) => {
					Object.assign(buscaAutor, autor)
				},
				{
					headers: {
						Authorization: token,
					},
				}
			)
			return buscaAutor
		} catch (error: any) {
			if (error.toString().includes("401")) {
				handleLogout()
			}
			return null
		}
	}

	// Carregamento dod dados do Produto
	useEffect(() => {
		fetchData("/autores", setAutores)
		fetchData("/categorias", setCategorias)
		fetchData("/editoras", setEditoras)
		if (id !== undefined) {
			buscarProdutoPorId(id)
		}else{
      resetarFormulario()
    }
	}, [id])

	// Filtragem dos dados
	useEffect(() => {
		const filteredAuthors = autores
			.filter((autor) => !selectedAutores.some((selected) => selected.id === autor.id))
			.filter((autor) => autor.nome.toUpperCase().includes(filtrarAutor)) // Filtrando pelo nome digitado

		setAvailableAutores(filteredAuthors)
	}, [autores, selectedAutores, filtrarAutor])

	// Carregamento dos dados dos Objetos relacionados no Update
	useEffect(() => {
		if (categoria.id !== 0 || editora.id !== 0 || selectedAutores.length > 0) {
			setProduto((prevState) => ({
				...prevState,
				categoria: categoria,
				editora: editora,
				autores: selectedAutores,
			}))
		}
	}, [categoria, editora, selectedAutores])

	const handleFiltrarAutor = (e: ChangeEvent<HTMLInputElement>) => {
		setFiltrarAutor(e.target.value.toUpperCase())
	}

	const handleAddAutor = async (e: React.MouseEvent) => {
		e.preventDefault()
		if (selectedAutorToAdd) {
			const autor = await buscarAutorPorId(selectedAutorToAdd)
			if (autor) {
				setSelectedAutores((prev) => [...prev, autor])
				setSelectedAutorToAdd("")
			}
		}
	}

	const handleRemoveAutor = (e: React.MouseEvent) => {
		e.preventDefault()
		if (selectedAutorToRemove) {
			setSelectedAutores((prev) =>
				prev.filter((autor) => autor.id.toString() !== selectedAutorToRemove)
			)

			// Remove do objeto produto
			setProduto((prevState) => ({
				...prevState,
				autores:
					prevState.autores?.filter(
						(autor) => autor.id.toString() !== selectedAutorToRemove
					) || [],
			}))

			setSelectedAutorToRemove("")
		}
	}

	const handleSelectAutorToAdd = (e: ChangeEvent<HTMLSelectElement>) => {
		e.preventDefault()
		setSelectedAutorToAdd(e.target.value)
	}

	const handleSelectAutorToRemove = (e: ChangeEvent<HTMLSelectElement>) => {
		e.preventDefault()
		setSelectedAutorToRemove(e.target.value)
	}

	function handleCategoriaChange(e: ChangeEvent<HTMLSelectElement>) {
		const selectedId = e.target.value
		if (selectedId) {
			fetchData(`/categorias/${selectedId}`, setCategoria)
		}
	}

	function handleEditoraChange(e: ChangeEvent<HTMLSelectElement>) {
		const selectedId = e.target.value
		if (selectedId) {
			fetchData(`/editoras/${selectedId}`, setEditora)
		}
	}

	function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
		const { type, value } = e.target

		let valor: string | number = value

		if (type === "number" || type === "range") {
			valor = value === "" ? "" : parseFloat(Number(value).toFixed(2))
		}

		setProduto((prevState) => ({
			...prevState,
			[e.target.name]: valor,
		}))
	}

	const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsLoading(true)
		try {
			id
				? await atualizar("/produtos", produto, setProduto, {
						headers: { Authorization: token },
				  })
				: await cadastrar("/produtos", produto, setProduto, {
						headers: { Authorization: token },
				  })
			ToastAlerta(`Produto ${id ? "atualizado" : "cadastrado"} com sucesso`, "sucesso")
			navigate("/")
		} catch (error) {
			handleError(error)
		} finally {
			setIsLoading(false)
		}
	}

	const categoriaSelecionado = produto.categoria?.id > 0
	const editoraSelecionada = produto.editora?.id > 0
	const autorSelecionado = produto.autores?.length > 0

	console.log(JSON.stringify(produto))

	return (
		<div className="container flex flex-col mx-auto items-center">
			<h1 className="text-4xl text-center my-4">
				{id !== undefined ? "Editar Produto" : "Cadastrar Produto"}
			</h1>

			<form className="flex flex-col w-1/2 gap-4" onSubmit={handleSubmit}>
				<div className="flex flex-col gap-2">
					<label htmlFor="titulo">Título</label>
					<input
						value={produto.titulo || ""}
						onChange={atualizarEstado}
						type="text"
						placeholder="Insira o titulo do Livro"
						id="titulo"
						name="titulo"
						required
						className="border-2 border-slate-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-zinc-400"
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor="preco">Preço</label>
					<input
						value={produto.preco || ""}
						onChange={atualizarEstado}
						type="number"
						step=".01"
						placeholder="Adicione o preço do Livro"
						id="preco"
						name="preco"
						required
						className="border-2 border-slate-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-zinc-400"
					/>
				</div>

				<div className="flex justify-between flex-nowrap">
					<div className="flex flex-col gap-2 w-1/2 pr-1">
						<label htmlFor="isbn10">ISBN-10</label>
						<input
							value={produto.isbn10 || ""}
							onChange={atualizarEstado}
							type="text"
							placeholder="ISBN-10"
							id="isbn10"
							name="isbn10"
							required
							className="border-2 border-slate-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-zinc-400"
						/>
					</div>

					<div className="flex flex-col gap-2 w-1/2 pl-1">
						<label htmlFor="isbn13">ISBN-13</label>
						<input
							value={produto.isbn13 || ""}
							onChange={atualizarEstado}
							type="text"
							placeholder="ISBN-13"
							id="isbn13"
							name="isbn13"
							required
							className="border-2 border-slate-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-zinc-400"
						/>
					</div>
				</div>
				<div className="flex flex-col gap-2 ">
					<label htmlFor="foto">Foto</label>
					<input
						type="text"
						placeholder="Insira o link da foto"
						id="foto"
						name="foto"
						className="border-2 border-slate-700 rounded p-2 utral-800"
						required
						value={produto.foto}
						onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
					/>
				</div>

				<div className="flex flex-col gap-2">
					<div className="flex flex-col gap-2">
						<label htmlFor="search-author">Autor</label>
						<input
							type="text"
							id="search-author"
							placeholder="Digite o nome do autor"
							className="border-2 border-slate-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-zinc-400"
							value={filtrarAutor}
							onChange={handleFiltrarAutor}
						/>
					</div>

					<div className="flex gap-4">
						<div className="flex flex-col flex-1">
							<label htmlFor="available-authors" className="text-sm mb-1">
								Lista de Autores
							</label>
							<select
								id="available-authors"
								className="border p-2 border-slate-800 rounded focus:outline-none focus:ring-2 focus:ring-zinc-400 h-32"
								value={selectedAutorToAdd}
								onChange={handleSelectAutorToAdd}
								size={5}
							>
								<option value="">Selecione para adicionar</option>
								{availableAutores.map((autor) => (
									<option key={autor.id} value={autor.id}>
										{autor.nome}
									</option>
								))}
							</select>
						</div>

						<div className="flex flex-col justify-center gap-2">
							<button
								type="button"
								onClick={handleAddAutor}
								disabled={!selectedAutorToAdd}
								className="px-2 py-1 bg-green-600 text-white rounded disabled:bg-gray-300"
							>
								<ArrowFatRight size={16} weight="bold" />
							</button>
							<button
								type="button"
								onClick={handleRemoveAutor}
								disabled={!selectedAutorToRemove}
								className="px-2 py-1 bg-red-600 text-white rounded disabled:bg-gray-300"
							>
								<ArrowFatLeft size={16} weight="bold" />
							</button>
						</div>

						<div className="flex flex-col flex-1">
							<label htmlFor="selected-authors" className="text-sm mb-1">
								Autores do Livro
							</label>
							<select
								id="selected-authors"
								className="border p-2 border-slate-800 rounded focus:outline-none focus:ring-2 focus:ring-zinc-400 h-32"
								value={selectedAutorToRemove}
								onChange={handleSelectAutorToRemove}
								size={5}
							>
								<option value="">Selecione para remover</option>
								{selectedAutores.map((autor) => (
									<option key={autor.id} value={autor.id}>
										{autor.nome}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<p>Categoria</p>
					<select
						name="categoria"
						id="categoria"
						className="border p-2 border-slate-800 rounded focus:outline-none focus:ring-2 focus:ring-zinc-400"
						onChange={handleCategoriaChange}
						value={produto.categoria?.id || ""}
					>
						<option value="" disabled>
							Selecione uma Categoria
						</option>
						{categorias.map((categoria) => (
							<option key={categoria.id} value={categoria.id}>
								{categoria.tipo}
							</option>
						))}
					</select>
				</div>

				<div className="flex flex-col gap-2">
					<p>Editora</p>
					<select
						name="editora"
						id="editora"
						className="border p-2 border-slate-800 rounded focus:outline-none focus:ring-2 focus:ring-zinc-400"
						onChange={handleEditoraChange}
						value={produto.editora?.id || ""}
					>
						<option value="" disabled>
							Selecione uma Editora
						</option>
						{editoras.map((editora) => (
							<option key={editora.id} value={editora.id}>
								{editora.nome}
							</option>
						))}
					</select>
				</div>

				<button
					type="submit"
					disabled={
						!categoriaSelecionado ||
						!editoraSelecionada ||
						!autorSelecionado ||
						isLoading
					}
					className="flex justify-center rounded disabled:bg-slate-200 bg-indigo-900 
                    hover:bg-indigo-600 text-white font-bold w-1/2 mx-auto py-2 mb-8"
				>
					{isLoading ? (
						<RotatingLines
							strokeColor="white"
							strokeWidth="5"
							animationDuration="0.75"
							width="24"
							visible={true}
						/>
					) : (
						<span>{id !== undefined ? "Atualizar" : "Cadastrar"}</span>
					)}
				</button>
			</form>
		</div>
	)
}

export default FormProduto

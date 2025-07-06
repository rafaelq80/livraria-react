import { screen } from "@testing-library/react"
import { beforeEach, describe, expect, test } from "vitest"
import { useAuthStore } from "../shared/store/AuthStore"
import messages from "../shared/constants/messages"

// Componentes React
import ListarAutores from "../autor/pages"
import FormAutor from "../autor/pages/FormAutor"

// Mocks e configurações de teste
import { autoresMock } from "./mswHandlers"
import { mockAuthStoreAsAdmin } from "./utils/mockAuthStore"
import { renderWithProviders } from "./utils/renderWithProviders"

// Funções utilitárias para testes
import {
	preencherFormularioAutor,
	excluirPrimeiroAutorDaLista,
	esperarRemocaoAutorDaTabela,
} from "./utils/autorHelpers"
import {
	clicarBotaoPorNome,
	esperarTextoNaTela,
	esperarToastNaTela,
} from "./utils/genericHelpers"

/**
 * Testes de fluxo para a listagem, cadastro, edição e exclusão de autores.
 * 
 * Utiliza:
 * - MSW para simular backend
 * - Mock do AuthStore para simular autenticação
 * - Helpers para ações comuns nos testes
 */
describe("Listagem de autores", () => {
	beforeEach(() => {
		mockAuthStoreAsAdmin() // Simula usuário admin autenticado
		autoresMock.length = 0 // Limpa dados mockados
	})

	test("01 - deve carregar e exibir autores do mock global", async () => {
		// Arrange: Adiciona autores ao mock
		autoresMock.push(
			{ id: 1, nome: "Autor 1", nacionalidade: "Brasileira" },
			{ id: 2, nome: "Autor 2", nacionalidade: "Portuguesa" }
		)
		
		// Act: Renderiza o componente
		renderWithProviders(<ListarAutores />)
		
		// Assert: Verifica se os autores aparecem na tela
		await esperarTextoNaTela("Autor 1")
		expect(screen.getAllByText("Brasileira").length).toBeGreaterThan(0)
	})

	test("02 - deve permitir cadastrar um novo autor", async () => {
		// Arrange: Limpa dados e configura rotas
		autoresMock.length = 0
		renderWithProviders(null, {
			route: "/autores",
			routes: [
				{ path: "/autores", element: <ListarAutores /> },
				{ path: "/cadastrarautor", element: <FormAutor /> },
			],
		})
		
		// Act: Navega para cadastro e preenche formulário
		await clicarBotaoPorNome(/adicionar autor/i)
		await preencherFormularioAutor({ nome: "Novo Autor" })
		await clicarBotaoPorNome(/cadastrar/i)
		
		// Assert: Verifica se o autor foi criado
		await esperarTextoNaTela("Novo Autor")
	})

	test("03 - deve permitir editar um autor existente", async () => {
		// Arrange: Cria autor para edição
		autoresMock.length = 0
		autoresMock.push({ id: 1, nome: "Autor Editável", nacionalidade: "Chilena" })
		renderWithProviders(null, {
			route: "/editarautor/1",
			routes: [
				{ path: "/editarautor/:id", element: <FormAutor /> },
				{ path: "/autores", element: <ListarAutores /> },
			],
		})
		
		// Act: Edita o autor
		await preencherFormularioAutor({ nome: "Autor Editado" })
		await clicarBotaoPorNome(/atualizar/i)
		
		// Assert: Verifica se a edição foi bem-sucedida
		await esperarTextoNaTela("Autor Editado")
	})

	test("04 - deve permitir excluir um autor", async () => {
		// Arrange: Cria autor para exclusão
		autoresMock.length = 0
		autoresMock.push({ id: 1, nome: "Autor Excluível", nacionalidade: "Uruguaia" })
		renderWithProviders(<ListarAutores />)
		
		// Act: Exclui o autor
		await excluirPrimeiroAutorDaLista()
		
		// Assert: Verifica se o autor foi removido
		await esperarRemocaoAutorDaTabela("Autor Excluível")
	})
})

describe("Validação do formulário de autor", () => {
	beforeEach(() => {
		mockAuthStoreAsAdmin()
		autoresMock.length = 0
	})

	test("05 - deve exibir erro se tentar cadastrar sem nome", async () => {
		// Arrange: Renderiza formulário de cadastro
		renderWithProviders(null, {
			route: "/cadastrarautor",
			routes: [
				{ path: "/cadastrarautor", element: <FormAutor /> },
			],
		})
		
		// Act: Tenta cadastrar sem preencher nome
		await clicarBotaoPorNome(/cadastrar/i)
		
		// Assert: Verifica mensagem de erro
		await esperarTextoNaTela(messages.autor.required.nome)
	})

	test("06 - deve exibir erro se nome possuir menos de 2 caracteres", async () => {
		// Arrange: Renderiza formulário de cadastro
		renderWithProviders(null, {
			route: "/cadastrarautor",
			routes: [
				{ path: "/cadastrarautor", element: <FormAutor /> },
			],
		})
		
		// Act: Preenche nome com apenas 1 caractere
		await preencherFormularioAutor({ nome: "A" })
		await clicarBotaoPorNome(/cadastrar/i)
		
		// Assert: Verifica mensagem de erro de tamanho mínimo
		await esperarTextoNaTela(messages.autor.minLength)
	})

	test("07 - deve permitir cadastrar sem nacionalidade", async () => {
		// Arrange: Renderiza formulário com rotas
		renderWithProviders(null, {
			route: "/cadastrarautor",
			routes: [
				{ path: "/cadastrarautor", element: <FormAutor /> },
				{ path: "/autores", element: <ListarAutores /> },
			],
		})
		
		// Act: Cadastra autor apenas com nome
		await preencherFormularioAutor({ nome: "Autor Sem Nacionalidade" })
		await clicarBotaoPorNome(/cadastrar/i)
		
		// Assert: Verifica se o cadastro foi bem-sucedido
		await esperarTextoNaTela("Autor Sem Nacionalidade")
	})
})

describe("Mensagens de feedback do autor", () => {
	beforeEach(() => {
		mockAuthStoreAsAdmin()
		autoresMock.length = 0
	})

	test("08 - deve exibir mensagem de sucesso ao cadastrar", async () => {
		// Arrange: Renderiza formulário de cadastro
		renderWithProviders(null, {
			route: "/cadastrarautor",
			routes: [
				{ path: "/cadastrarautor", element: <FormAutor /> },
			],
		})
		
		// Act: Cadastra autor válido
		await preencherFormularioAutor({ nome: "Autor Sucesso" })
		await clicarBotaoPorNome(/cadastrar/i)
		
		// Assert: Verifica toast de sucesso
		await esperarToastNaTela(messages.autor.createSuccess)
	})
})

describe("Fluxos de erro do autor", () => {
	beforeEach(() => {
		mockAuthStoreAsAdmin()
		autoresMock.length = 0
	})

	test("09 - deve exibir mensagem de erro ao tentar editar autor inexistente", async () => {
		// Arrange: Tenta editar autor com ID inexistente
		renderWithProviders(null, {
			route: "/editarautor/999",
			routes: [
				{ path: "/editarautor/:id", element: <FormAutor /> },
			],
		})
		
		// Assert: Verifica toast de erro
		await esperarToastNaTela(messages.autor.notFound)
	})
})

describe("Listagem de autores vazia", () => {
	beforeEach(() => {
		mockAuthStoreAsAdmin()
		autoresMock.length = 0
	})

	test("10 - deve exibir mensagem de lista vazia", async () => {
		// Arrange: Renderiza lista sem dados
		renderWithProviders(<ListarAutores />)
		
		// Assert: Verifica mensagem de lista vazia
		await esperarTextoNaTela(messages.autor.emptyList)
	})
})

describe("Permissões de acesso ao recurso autor", () => {
	beforeEach(() => {
		autoresMock.length = 0
		// Limpa o localStorage para simular usuário não autenticado
		localStorage.clear()
	})

	test("11 - usuário não autenticado não deve acessar listagem", async () => {
		// Arrange: Não mocka AuthStore, simula não autenticado
		renderWithProviders(<ListarAutores />)
		
		// Assert: Verifica mensagem de login obrigatório
		await esperarToastNaTela(messages.auth.loginRequired)
	})

	test("12 - usuário não admin não deve ver botões de ação", async () => {
		// Arrange: Mocka AuthStore como usuário comum
		useAuthStore.setState({
			usuario: {
				id: 2,
				nome: "Comum",
				usuario: "comum",
				senha: "123",
				foto: "",
				token: "fake",
				roles: [{ id: 1, nome: "user", descricao: "Usuário comum" }]
			},
			isAdmin: false,
			isAuthenticated: true,
		})
		autoresMock.push({ id: 1, nome: "Autor Comum", nacionalidade: "Brasileira" })
		renderWithProviders(<ListarAutores />)
		
		// Assert: Verifica que botões de ação não estão presentes
		const editButtons = screen.queryAllByRole('button', { name: /editar/i })
		expect(editButtons.length).toBe(0)
		const deleteButtons = screen.queryAllByRole('button', { name: /excluir/i })
		expect(deleteButtons.length).toBe(0)
	})
})

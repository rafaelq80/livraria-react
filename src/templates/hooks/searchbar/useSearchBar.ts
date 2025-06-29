import { useState, FormEvent, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { listar, ensureArrayResponse } from "../../../services/AxiosService"
import Produto from "../../../produto/models/Produto"

interface SearchBarHookReturn {
  titulo: string
  setTitulo: (titulo: string) => void
  mobileMenuOpen: boolean
  setMobileMenuOpen: (isOpen: boolean) => void
  buscarProdutos: (e: FormEvent<HTMLFormElement>) => void
  toggleMobileMenu: () => void
  suggestions: string[]
  selectSuggestion: (suggestion: string) => void
}

export function useSearchBar(): SearchBarHookReturn {
  const navigate = useNavigate()
  const [titulo, setTitulo] = useState<string>("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])

  // Buscar todos os produtos uma vez
  useEffect(() => {
    const buscarProdutos = async () => {
      try {
        const resposta = await listar<Produto[]>("/produtos")
        setProdutos(ensureArrayResponse<Produto>(resposta))
      } catch (error) {
        console.error("Erro ao carregar produtos:", error)
        setProdutos([])
      }
    }
    
    buscarProdutos()
  }, [])

  // Filtrar sugestões baseadas no texto digitado
  useEffect(() => {
    if (titulo.trim() === "") {
      setSuggestions([])
      return
    }

    const normalizar = (str: string) =>
      str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase()
    
    const tituloNormalizado = normalizar(titulo)
    
    const filteredSuggestions = produtos
      .filter(produto => normalizar(produto.titulo).includes(tituloNormalizado))
      .map(produto => produto.titulo)
      // Limitar a 5 sugestões para não sobrecarregar a interface
      .slice(0, 5)
    
    setSuggestions(filteredSuggestions)
  }, [titulo, produtos])

  function buscarProdutos(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (titulo.trim()) {
      navigate(`/consultarnome/${titulo}`)
      setTitulo("")
      setSuggestions([])
    }
  }

  function selectSuggestion(suggestion: string) {
    setTitulo(suggestion)
    navigate(`/consultarnome/${suggestion}`)
    setTitulo("")
    setSuggestions([])
  }

  function toggleMobileMenu() {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return {
    titulo,
    setTitulo,
    mobileMenuOpen,
    setMobileMenuOpen,
    buscarProdutos,
    toggleMobileMenu,
    suggestions,
    selectSuggestion
  }
}
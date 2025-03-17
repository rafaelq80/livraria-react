import { useState, FormEvent } from "react"
import { useNavigate } from "react-router-dom"

interface SearchBarHookReturn {
  titulo: string
  setTitulo: (titulo: string) => void
  mobileMenuOpen: boolean
  setMobileMenuOpen: (isOpen: boolean) => void
  buscarProdutos: (e: FormEvent<HTMLFormElement>) => void
  toggleMobileMenu: () => void
}

export function useSearchBar(): SearchBarHookReturn {
  const navigate = useNavigate()
  const [titulo, setTitulo] = useState<string>("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  function buscarProdutos(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    navigate(`/consultarnome/${titulo}`)
    setTitulo("")
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
    toggleMobileMenu
  }
}

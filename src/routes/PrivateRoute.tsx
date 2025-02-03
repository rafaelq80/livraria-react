import { useContext, useEffect } from "react"
import { Navigate, Outlet } from "react-router-dom"
import AuthContext from "../contexts/AuthContext"
import { ToastAlerta } from "../utils/ToastAlerta"

function PrivateRoute() {
	const { isAuthenticated } = useContext(AuthContext)

    useEffect(() => {
		if (!isAuthenticated) {
			ToastAlerta("Você precisa estar logado!", "info")
		}
	}, [isAuthenticated])
    
	if (!isAuthenticated) {
		return <Navigate to="/" />
	}

	// Renderiza as rotas protegidas através do Outlet
	return <Outlet />
}

export default PrivateRoute

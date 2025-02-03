import { createContext, ReactNode, useState } from "react";
import UsuarioLogin from "../models/UsuarioLogin";
import { ToastAlerta } from "../utils/ToastAlerta";
import { login } from "../services/AxiosService";

interface AuthContextProps {
    usuario: UsuarioLogin;
    handleLogout(): void;
    handleLogin(usuario: UsuarioLogin): Promise<void>;
    isLoading: boolean;
    isAuthenticated: boolean
    isLogout: boolean;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {

    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: '',
        token: ''
    });

    const [isLoading, setIsLoading] = useState(false);
       
    const [isLogout, setIsLogout] = useState(false);

    async function handleLogin(usuarioLogin: UsuarioLogin) {

        setIsLoading(true);

        try {
            await login(`/usuarios/logar`, usuarioLogin, setUsuario);
            ToastAlerta("Usuário autenticado com sucesso!", "sucesso");
            setIsLogout(false);
        } catch (error) {
            ToastAlerta("Dados do Usuário inconsistentes!", "erro");
        }
        
        setIsLoading(false);
    }

    function handleLogout() {
        setUsuario({
            id: 0,
            nome: '',
            usuario: '',
            senha: '',
            foto: '',
            token: '',
        })
        setIsLogout(true);
    }

    return (
        <AuthContext.Provider value={{ 
            usuario, 
            handleLogin, 
            handleLogout, 
            isLoading, 
            isAuthenticated: !!usuario.token, 
            isLogout, 
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
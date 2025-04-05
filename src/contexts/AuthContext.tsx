import { createContext, ReactNode, useEffect, useState } from "react";
import UsuarioLogin from "../models/UsuarioLogin";
import { ToastAlerta } from "../utils/ToastAlerta";
import { login } from "../services/AxiosService";

interface AuthContextProps {
    usuario: UsuarioLogin;
    handleLogout(): void;
    handleLogin(usuario: UsuarioLogin): Promise<void>;
    isLoading: boolean;
    isAuthenticated: boolean;
    isAdmin: boolean;
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
        token: '',
        roles: [],
    });

    const [isLoading, setIsLoading] = useState(false);
       
    const [isLogout, setIsLogout] = useState(false);

    const [isAdmin, setIsAdmin] = useState(false);

    // Verifica se o usuário é admin sempre que as roles mudarem
    useEffect(() => {
        // Verifica se o array de roles existe e se contém "ADMIN" ou similar
        const checkIsAdmin = () => {
            if (usuario.roles && usuario.roles.length > 0) {
                const adminRole = usuario.roles.find(role => 
                    role.nome.toLowerCase().includes('admin')
                );
                setIsAdmin(!!adminRole);
            } else {
                setIsAdmin(false);
            }
        };

        checkIsAdmin();
    }, [usuario.roles]);
    
    async function handleLogin(usuarioLogin: UsuarioLogin) {

        setIsLoading(true);

        try {
            const resposta = await login<UsuarioLogin>(`/usuarios/logar`, usuarioLogin);
            setUsuario(resposta);
            ToastAlerta("Usuário autenticado com sucesso!", "sucesso");
            setIsLogout(false);
        } catch (error: unknown) {
            console.error("Erro: ", error);
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
            roles: [],
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
            isAdmin,
            isLogout, 
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
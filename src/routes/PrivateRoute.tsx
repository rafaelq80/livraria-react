import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Role from "../models/Role";
import { useAuth } from "../store/AuthStore";
import { ToastAlerta } from "../utils/ToastAlerta";

interface PrivateRouteProps {
  allowedRoles: Role[];
}

function PrivateRoute({ allowedRoles }: PrivateRouteProps) {
  const { usuario, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      ToastAlerta("Você precisa estar logado!", "info");
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Se `usuario.roles` estiver undefined ou for um objeto único, tratamos como um array
  const userRoles: Role[] = Array.isArray(usuario.roles) ? usuario.roles : [usuario.roles];

  // Verifica se pelo menos um dos roles do usuário está na lista de roles permitidas
  const hasPermission = userRoles.some((role) =>
    allowedRoles.some((allowedRole) => allowedRole.nome === role.nome)
  );

  if (!hasPermission) {
    return <Navigate to="/forbidden" />;
  }

  return <Outlet />;
}

export default PrivateRoute;

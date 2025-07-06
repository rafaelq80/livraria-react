import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../shared/store/AuthStore";
import { ToastAlerta } from "../shared/utils/ToastAlerta";
import messages from "../shared/constants/messages";
import Role from "../role/models/Role";

interface PrivateRouteProps {
  allowedRoles: Role[];
}

function PrivateRoute({ allowedRoles }: Readonly<PrivateRouteProps>) {
  const { usuario, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      		ToastAlerta(messages.auth.loginRequired, "info");
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

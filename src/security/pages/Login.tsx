import { Link } from "react-router-dom"
import { useLogin } from "../hooks/useLogin"
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react"
import Button from "../../shared/components/ui/Button"

function Login() {
  const { 
    register, 
    handleSubmit, 
    errors, 
    isLoading, 
    showPassword, 
    toggleShowPassword 
  } = useLogin()

  return (
    <div className="flex items-center justify-center md:min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg mx-2 p-8 w-96">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="usuario" className="block text-gray-700 font-medium">
              Usuário
            </label>
            <input
              id="usuario"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("usuario")}
            />
            {errors.usuario && (
              <p className="text-red-500 text-sm mt-1">{errors.usuario.message}</p>
            )}
          </div>
          <div className="relative mb-4">
            <label htmlFor="senha" className="block text-gray-700 font-medium">
              Senha
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="senha"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("senha")}
            />
            {errors.senha && (
              <p className="text-red-500 text-sm mt-1">{errors.senha.message}</p>
            )}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="top-9 right-2 absolute text-slate-700 p-1"
              onClick={toggleShowPassword}
            >
              {showPassword ? <EyeIcon size={20} /> : <EyeSlashIcon size={20} />}
            </Button>
          </div>
          <div className="flex justify-between items-center mb-4">
            <Link to="/recuperarsenha" className="text-blue-500 text-sm hover:underline">
              Esqueceu a senha?
            </Link>
          </div>
          <Button
            type="submit"
            variant="primary"
            size="full"
            isLoading={isLoading}
            className="w-full"
          >
            Entrar
          </Button>
        </form>
        <p className="text-center text-gray-600 text-sm mt-4">
          Não tem uma conta?{" "}
          <Link to="/cadastro" className="text-blue-500 hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
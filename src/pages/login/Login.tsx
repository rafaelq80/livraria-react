import { RotatingLines } from "react-loader-spinner"
import { Link } from "react-router-dom"
import { EyeSlash, Eye } from "@phosphor-icons/react"
import { useLogin } from "../../hooks/login/useLogin"


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
            <button
              type="button"
              className="top-9 right-2 absolute text-slate-700"
              onClick={toggleShowPassword}
            >
              {showPassword ? <Eye size={20} /> : <EyeSlash size={20} />}
            </button>
          </div>
          <div className="flex justify-between items-center mb-4">
            <Link to="/recuperarsenha" className="text-blue-500 text-sm hover:underline">
              Esqueceu a senha?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-900 text-white py-2 rounded-lg hover:bg-indigo-700 transition flex justify-center"
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
              <span>Entrar</span>
            )}
          </button>
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
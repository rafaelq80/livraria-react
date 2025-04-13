import { RotatingLines } from "react-loader-spinner";
import { useRecuperarSenha } from "../../hooks/usuarios/useRecuperarSenha";

function RecuperarSenha() {
  const {
    message,
    isLoading,
    register,
    errors,
    onSubmit,
    voltar,
  } = useRecuperarSenha();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Recuperar Senha
        </h2>
        
        {message && (
          <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded">{message}</div>
        )}
        
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label htmlFor="usuario" className="block mb-2 text-sm font-medium">
              E-mail
            </label>
            <input
              type="email"
              id="usuario"
              placeholder="Digite o seu e-mail"
              className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.usuario ? "border-red-500" : ""
              }`}
              {...register("usuario")}
            />
            {errors.usuario && (
              <p className="mt-1 text-sm text-red-600">{errors.usuario.message}</p>
            )}
          </div>
          
          <div className="flex justify-around gap-4 w-full">
            <button
              type="button"
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-400 transition flex justify-center"
              onClick={voltar}
            >
              Voltar
            </button>
            
            <button
              type="submit"
              disabled={isLoading}
              className="flex justify-center w-full bg-indigo-900 text-white py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-700 disabled:opacity-50"
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
                <span>Continuar</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RecuperarSenha;
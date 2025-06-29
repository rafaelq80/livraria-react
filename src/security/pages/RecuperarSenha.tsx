import { useRecuperarSenha } from "../../usuario/hooks/useRecuperarSenha";
import Button from "../../shared/components/ui/Button";

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
            <Button
              type="button"
              variant="danger"
              size="full"
              onClick={voltar}
            >
              Voltar
            </Button>
            
            <Button
              type="submit"
              variant="primary"
              size="full"
              isLoading={isLoading}
              disabled={isLoading}
            >
              Continuar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RecuperarSenha;
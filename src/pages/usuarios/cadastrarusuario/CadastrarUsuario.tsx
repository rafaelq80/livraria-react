import { RotatingLines } from "react-loader-spinner"
import { useCadastrarUsuario } from "../../../hooks/usuarios/useCadastrarUsuario"

function CadastrarUsuario() {
  const {
    isLoading,
    register,
    handleSubmit,
    errors,
    onSubmit,
    retornar
  } = useCadastrarUsuario()

  return (
    <>
      <div className="place-items-center grid grid-cols-1 lg:grid-cols-2 h-screen font-bold">
        <div
          style={{
            backgroundImage: `url("https://ik.imagekit.io/vzr6ryejm/livraria/fundo_03.jpg?updatedAt=1741417902238")`,
          }}
          className="lg:block hidden bg-no-repeat w-full min-h-screen bg-cover bg-center"
        ></div>
        <form
          className="flex flex-col justify-center items-center gap-3 w-2/3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-5xl text-slate-900">Cadastrar</h2>
          <div className="flex flex-col w-full">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              placeholder="Adicione o nome"
              className="border-2 border-slate-700 p-2 rounded"
              {...register("nome")}
            />
            {errors.nome && <span className="text-red-500 text-sm">{errors.nome.message}</span>}
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="usuario">Usuario</label>
            <input
              type="text"
              id="usuario"
              placeholder="Adicione o usuário (e-mail)"
              className="border-2 border-slate-700 p-2 rounded"
              {...register("usuario")}
            />
            {errors.usuario && <span className="text-red-500 text-sm">{errors.usuario.message}</span>}
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="foto">Foto</label>
            <input
              type="text"
              id="foto"
              placeholder="Adicione a Foto"
              className="border-2 border-slate-700 p-2 rounded"
              {...register("foto")}
            />
            {errors.foto && <span className="text-red-500 text-sm">{errors.foto.message}</span>}
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              placeholder="Adicione a Senha"
              className="border-2 border-slate-700 p-2 rounded"
              {...register("senha")}
            />
            {errors.senha && <span className="text-red-500 text-sm">{errors.senha.message}</span>}
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              placeholder="Confirmar a Senha"
              className="border-2 border-slate-700 p-2 rounded"
              {...register("confirmarSenha")}
            />
            {errors.confirmarSenha && <span className="text-red-500 text-sm">{errors.confirmarSenha.message}</span>}
          </div>
          <div className="flex justify-around gap-8 w-full">
            <button
              type="button"
              className="bg-red-400 hover:bg-red-700 py-2 rounded w-1/2 text-white"
              onClick={retornar}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex justify-center bg-indigo-400 hover:bg-indigo-900 py-2 rounded w-1/2 text-white"
              disabled={isLoading}
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
                <span>Cadastrar</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default CadastrarUsuario
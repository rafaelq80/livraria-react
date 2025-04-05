import { ArrowFatLeft, ArrowFatRight } from "@phosphor-icons/react";
import { RotatingLines } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { useFormProduto } from "../../../hooks/produtos/formproduto/useFormProduto";

function FormProduto() {
  const { id } = useParams<{ id: string }>();
  const {
    register,
    errors,
    isLoading,
    categorias,
    editoras,
    availableAutores,
    selectedAutores,
    selectedAutorToAdd,
    selectedAutorToRemove,
    filtrarAutor,
    handleFiltrarAutor,
    handleAddAutor,
    handleRemoveAutor,
    handleSelectAutorToAdd,
    handleSelectAutorToRemove,
    handleCategoriaChange,
    handleEditoraChange,
    onSubmit,
    formValues
  } = useFormProduto(id);

  return (
    <div className="container px-4 flex flex-col mx-auto items-center">
      <h1 className="text-2xl md:text-3xl lg:text-4xl text-center my-4">
        {id !== undefined ? "Editar Produto" : "Cadastrar Produto"}
      </h1>

      <form className="flex flex-col w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 gap-4" onSubmit={onSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Título</label>
          <input
            {...register("titulo")}
            type="text"
            placeholder="Insira o título do Livro"
            id="titulo"
            className={`bg-white border-2 ${errors.titulo ? "border-red-500" : "border-slate-700"} rounded p-2 focus:outline-none focus:ring-2 focus:ring-zinc-400`}
          />
          {errors.titulo && <p className="text-red-500 text-sm">{errors.titulo.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="preco">Preço</label>
          <input
            {...register("preco")}
            type="number"
            step=".01"
            placeholder="Adicione o preço do Livro"
            id="preco"
            className={`bg-white border-2 ${errors.preco ? "border-red-500" : "border-slate-700"} rounded p-2 focus:outline-none focus:ring-2 focus:ring-zinc-400`}
          />
          {errors.preco && <p className="text-red-500 text-sm">{errors.preco.message}</p>}
        </div>

        <div className="flex flex-col sm:flex-row justify-between sm:flex-nowrap gap-2 sm:gap-4">
          <div className="flex flex-col gap-2 w-full sm:w-1/2">
            <label htmlFor="isbn10">ISBN-10</label>
            <input
              {...register("isbn10")}
              type="text"
              placeholder="ISBN-10"
              id="isbn10"
              className={`bg-white border-2 ${errors.isbn10 ? "border-red-500" : "border-slate-700"} rounded p-2 focus:outline-none focus:ring-2 focus:ring-zinc-400`}
            />
            {errors.isbn10 && <p className="text-red-500 text-sm">{errors.isbn10.message}</p>}
          </div>

          <div className="flex flex-col gap-2 w-full sm:w-1/2">
            <label htmlFor="isbn13">ISBN-13</label>
            <input
              {...register("isbn13")}
              type="text"
              placeholder="ISBN-13"
              id="isbn13"
              className={`bg-white border-2 ${errors.isbn13 ? "border-red-500" : "border-slate-700"} rounded p-2 focus:outline-none focus:ring-2 focus:ring-zinc-400`}
            />
            {errors.isbn13 && <p className="text-red-500 text-sm">{errors.isbn13.message}</p>}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="foto">Foto</label>
          <input
            {...register("foto")}
            type="text"
            placeholder="Insira o link da foto"
            id="foto"
            className={`bg-white border-2 ${errors.foto ? "border-red-500" : "border-slate-700"} rounded p-2 focus:outline-none focus:ring-2 focus:ring-zinc-400`}
          />
          {errors.foto && <p className="text-red-500 text-sm">{errors.foto.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="search-author">Autor</label>
            <input
              type="text"
              id="search-author"
              placeholder="Digite o nome do autor"
              className="bg-white border-2 border-slate-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-zinc-400"
              value={filtrarAutor}
              onChange={handleFiltrarAutor}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-2">
            <div className="flex flex-col flex-1">
              <label htmlFor="available-authors" className="mb-1">
                Lista de Autores
              </label>
              <select
                id="available-authors"
                className="bg-white border p-2 border-slate-800 rounded focus:outline-none focus:ring-2 focus:ring-zinc-400 h-32 w-full text-ellipsis overflow-hidden"
                value={selectedAutorToAdd}
                onChange={handleSelectAutorToAdd}
                size={5}
              >
                <option value="">Selecione para adicionar</option>
                {availableAutores.map((autor) => (
                  <option key={autor.id} value={autor.id}>
                    {autor.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex md:flex-col justify-center items-center gap-4 md:gap-2 py-2 md:py-0">
              <button
                type="button"
                onClick={handleAddAutor}
                disabled={!selectedAutorToAdd}
                className="px-4 py-2 md:px-2 md:py-1 bg-green-600 text-white rounded disabled:bg-gray-400 flex items-center justify-center"
              >
                <span className="md:hidden mr-2">Adicionar</span>
                <ArrowFatRight size={16} weight="bold" className="hidden md:block" />
                <ArrowFatRight size={16} weight="bold" className="md:hidden transform rotate-90" />
              </button>
              
              <button
                type="button"
                onClick={handleRemoveAutor}
                disabled={!selectedAutorToRemove}
                className="px-4 py-2 md:px-2 md:py-1 bg-red-600 text-white rounded disabled:bg-gray-400 flex items-center justify-center"
              >
                <span className="md:hidden mr-2">Remover</span>
                <ArrowFatLeft size={16} weight="bold" className="hidden md:block" />
                <ArrowFatLeft size={16} weight="bold" className="md:hidden transform -rotate-90" />
              </button>
            </div>

            <div className="flex flex-col flex-1">
              <label htmlFor="selected-authors" className="mb-1">
                Autores do Livro
              </label>
              <select
                id="selected-authors"
                className="bg-white border p-2 border-slate-800 rounded focus:outline-none focus:ring-2 focus:ring-zinc-400 h-32 w-full text-ellipsis overflow-hidden"
                value={selectedAutorToRemove}
                onChange={handleSelectAutorToRemove}
                size={5}
              >
                <option value="">Selecione para remover</option>
                {selectedAutores.map((autor) => (
                  <option key={autor.id} value={autor.id}>
                    {autor.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {errors.autores && <p className="text-red-500 text-sm">{errors.autores.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <p>Categoria</p>
          <select
            id="categoria"
            className={`bg-white border p-2 ${errors.categoria?.id ? "border-red-500" : "border-slate-800"} rounded focus:outline-none focus:ring-2 focus:ring-zinc-400`}
            onChange={handleCategoriaChange}
            value={formValues.categoria?.id || ""}
          >
            <option value="" disabled>
              Selecione uma Categoria
            </option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.tipo}
              </option>
            ))}
          </select>
          {errors.categoria?.id && <p className="text-red-500 text-sm">{errors.categoria.id.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <p>Editora</p>
          <select
            id="editora"
            className={`bg-white border p-2 ${errors.editora?.id ? "border-red-500" : "border-slate-800"} rounded focus:outline-none focus:ring-2 focus:ring-zinc-400`}
            onChange={handleEditoraChange}
            value={formValues.editora?.id || ""}
          >
            <option value="" disabled>
              Selecione uma Editora
            </option>
            {editoras.map((editora) => (
              <option key={editora.id} value={editora.id}>
                {editora.nome}
              </option>
            ))}
          </select>
          {errors.editora?.id && <p className="text-red-500 text-sm">{errors.editora.id.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="flex justify-center rounded disabled:bg-gray-400 bg-indigo-900 
                  hover:bg-indigo-600 text-white font-bold w-full sm:w-2/3 md:w-1/2 mx-auto py-2 mb-8"
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
            <span>{id !== undefined ? "Atualizar" : "Cadastrar"}</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default FormProduto;
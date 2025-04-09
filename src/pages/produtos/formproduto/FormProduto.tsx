import { ArrowFatLeft, ArrowFatRight } from "@phosphor-icons/react"
import { RotatingLines } from "react-loader-spinner"
import { useParams } from "react-router-dom"
import { useFormProduto } from "../../../hooks/produtos/formproduto/useFormProduto"
import { CampoFoto } from "../../../components/campofoto/CampoFoto"
import { NumericFormat, PatternFormat } from "react-number-format"
import { Controller } from "react-hook-form"

function FormProduto() {
	const { id } = useParams<{ id: string }>()
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
		formValues,
		control,
		setValue,
	} = useFormProduto(id)

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
			<div className="container mx-auto bg-white rounded-lg shadow-lg p-4 md:p-6 lg:p-8 w-full max-w-7xl">
				<h1 className="text-2xl md:text-3xl lg:text-4xl text-center mb-6 text-black">
					{id !== undefined ? "Editar Produto" : "Cadastrar Produto"}
				</h1>

				<form className="w-full" onSubmit={onSubmit}>
					{/* Layout principal - foto à esquerda, campos à direita */}
					<div className="flex flex-col lg:flex-row gap-8">
						{/* Coluna da esquerda - foto */}
						<div className="w-full lg:w-1/3">
							<div className="sticky top-8">
								<CampoFoto
									control={control}
									setValue={setValue}
									photoFieldName="fotoFile"
									initialPreview={formValues.foto}
									square={true}
									camera={false}
									label="Capa do Livro"
								/>
								{errors.foto && (
									<p className="text-red-500 text-sm mt-2 text-center">
										{errors.foto.message}
									</p>
								)}
							</div>
						</div>

						{/* Coluna da direita - campos */}
						<div className="w-full lg:w-2/3">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
								{/* Título - ocupa linha inteira */}
								<div className="md:col-span-2">
									<label
										htmlFor="titulo"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										Título
									</label>
									<input
										{...register("titulo")}
										type="text"
										placeholder="Insira o título do Livro"
										id="titulo"
										className={`w-full bg-white border-2 ${
											errors.titulo ? "border-red-500" : "border-slate-700"
										} rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
									/>
									{errors.titulo && (
										<p className="text-red-500 text-sm mt-1">
											{errors.titulo.message}
										</p>
									)}
								</div>

								{/* Preço com NumericFormat */}
								<div>
									<label
										htmlFor="preco"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										Preço
									</label>
									<Controller
										name="preco"
										control={control}
										render={({ field: { onChange, value, ref } }) => (
											<NumericFormat
												id="preco"
												value={value}
												onValueChange={(values) => {
													onChange(values.floatValue)
												}}
												thousandSeparator="."
												decimalSeparator=","
												prefix="R$ "
												decimalScale={2}
												fixedDecimalScale
												placeholder="R$ 0,00"
												className={`w-full bg-white border-2 ${
													errors.preco
														? "border-red-500"
														: "border-slate-700"
												} rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
												getInputRef={ref}
											/>
										)}
									/>
									{errors.preco && (
										<p className="text-red-500 text-sm mt-1">
											{errors.preco.message}
										</p>
									)}
								</div>

								{/* Categoria */}
								<div>
									<label
										htmlFor="categoria"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										Categoria
									</label>
									<select
										id="categoria"
										className={`w-full bg-white border-2 ${
											errors.categoria?.id
												? "border-red-500"
												: "border-slate-700"
										} rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
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
									{errors.categoria?.id && (
										<p className="text-red-500 text-sm mt-1">
											{errors.categoria.id.message}
										</p>
									)}
								</div>

								{/* ISBN-10 */}
								<div>
									<label
										htmlFor="isbn10"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										ISBN-10
									</label>
									<Controller
										name="isbn10"
										control={control}
										render={({ field: { onChange, value, ref } }) => (
											<PatternFormat
												getInputRef={ref}
												value={value}
												onValueChange={(val) => onChange(val.value)}
												format="###-#-#####-#"
												allowEmptyFormatting
												mask="_"
												className={`w-full bg-white border-2 ${
													errors.isbn10
														? "border-red-500"
														: "border-slate-700"
												} rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
											/>
										)}
									/>

									{errors.isbn10 && (
										<p className="text-red-500 text-sm mt-1">
											{errors.isbn10.message}
										</p>
									)}
								</div>

								{/* ISBN-13 */}
								<div>
									<label
										htmlFor="isbn13"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										ISBN-13
									</label>
									<Controller
										name="isbn13"
										control={control}
										render={({ field: { onChange, value, ref } }) => (
											<PatternFormat
												getInputRef={ref}
												value={value}
												onValueChange={(val) => onChange(val.value)}
												format="###-#-#####-####"
												allowEmptyFormatting
												mask="_"
												className={`w-full bg-white border-2 ${
													errors.isbn13
														? "border-red-500"
														: "border-slate-700"
												} rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
											/>
										)}
									/>
									{errors.isbn13 && (
										<p className="text-red-500 text-sm mt-1">
											{errors.isbn13.message}
										</p>
									)}
								</div>

								{/* Editora */}
								<div>
									<label
										htmlFor="editora"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										Editora
									</label>
									<select
										id="editora"
										className={`w-full bg-white border-2 ${
											errors.editora?.id
												? "border-red-500"
												: "border-slate-700"
										} rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
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
									{errors.editora?.id && (
										<p className="text-red-500 text-sm mt-1">
											{errors.editora.id.message}
										</p>
									)}
								</div>
							</div>

							{/* Seção de Autores */}
							<div className="mb-6">
								<h3 className="text-lg font-medium text-gray-800 mb-3">Autores</h3>

								{/* Campo de Busca de Autor */}
								<div className="mb-4">
									<label
										htmlFor="search-author"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										Buscar Autor
									</label>
									<input
										type="text"
										id="search-author"
										placeholder="Digite o nome do autor para filtrar"
										className="w-full bg-white border-2 border-slate-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
										value={filtrarAutor}
										onChange={handleFiltrarAutor}
									/>
								</div>

								{/* Painel de Seleção de Autores */}
								<div className="flex flex-col md:flex-row gap-4">
									{/* Lista de Autores Disponíveis */}
									<div className="flex-1">
										<label
											htmlFor="available-authors"
											className="block text-sm font-medium text-gray-700 mb-1"
										>
											Autores Disponíveis
										</label>
										<select
											id="available-authors"
											className="w-full bg-white border-2 border-slate-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 h-40"
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

									{/* Botões de Ação */}
									<div className="flex md:flex-col justify-center items-center gap-3 my-2">
										<button
											type="button"
											onClick={handleAddAutor}
											disabled={!selectedAutorToAdd}
											className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded disabled:bg-gray-400 flex items-center justify-center transition-colors"
										>
											<span className="md:hidden mr-2">Adicionar</span>
											<ArrowFatRight
												size={18}
												weight="bold"
												className="hidden md:block"
											/>
											<ArrowFatRight
												size={18}
												weight="bold"
												className="md:hidden transform rotate-90"
											/>
										</button>

										<button
											type="button"
											onClick={handleRemoveAutor}
											disabled={!selectedAutorToRemove}
											className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded disabled:bg-gray-400 flex items-center justify-center transition-colors"
										>
											<span className="md:hidden mr-2">Remover</span>
											<ArrowFatLeft
												size={18}
												weight="bold"
												className="hidden md:block"
											/>
											<ArrowFatLeft
												size={18}
												weight="bold"
												className="md:hidden transform -rotate-90"
											/>
										</button>
									</div>

									{/* Lista de Autores Selecionados */}
									<div className="flex-1">
										<label
											htmlFor="selected-authors"
											className="block text-sm font-medium text-gray-700 mb-1"
										>
											Autores do Livro
										</label>
										<select
											id="selected-authors"
											className="w-full bg-white border-2 border-slate-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 h-40"
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
								{errors.autores && (
									<p className="text-red-500 text-sm mt-2">
										{errors.autores.message}
									</p>
								)}
							</div>
						</div>
					</div>

					{/* Botão de Submissão - na largura total */}
					<div className="mt-8 flex justify-center">
						<button
							type="submit"
							disabled={isLoading}
							className="px-8 py-3 rounded-md disabled:bg-gray-400 bg-indigo-900 
                    hover:bg-indigo-700 text-white font-bold transition-colors w-full md:w-1/2 lg:w-1/3"
						>
							{isLoading ? (
								<div className="flex justify-center">
									<RotatingLines
										strokeColor="white"
										strokeWidth="5"
										animationDuration="0.75"
										width="24"
										visible={true}
									/>
								</div>
							) : (
								<span>{id !== undefined ? "Atualizar" : "Cadastrar"}</span>
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default FormProduto

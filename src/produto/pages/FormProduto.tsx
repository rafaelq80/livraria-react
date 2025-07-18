import { useParams } from "react-router-dom"
import SelectField from "../../shared/components/ui/SelectField"
import { CampoFoto } from "../../shared/components/campofoto/CampoFoto"
import Button from "../../shared/components/ui/Button"
import CurrencyField from "../../shared/components/ui/CurrencyField"
import InputField from "../../shared/components/ui/InputField"
import PatternField from "../../shared/components/ui/PatternField"
import PercentField from "../../shared/components/ui/PercentField"
import { useFormProduto } from "../hooks/useFormProduto"
import TextArea from "../../shared/components/ui/TextArea"
import TagInput from "../../shared/components/taginput/TagInput"
import { Option } from "../../templates/types/SelectFieldTypes"

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
		setSelectedAutores,
		handleCategoriaChange,
		handleEditoraChange,
		onSubmit,
		retornar,
		formValues,
		control,
		setValue,
	} = useFormProduto(id)

	// Transformar categorias e editoras em options para SelectField
	const categoriasOptions: Option[] = categorias.map((categoria) => ({
		id: categoria.id,
		label: categoria.tipo,
	}))

	const editorasOptions: Option[] = editoras.map((editora) => ({
		id: editora.id,
		label: editora.nome,
	}))

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
			<div className="container mx-auto bg-white rounded-lg shadow-lg p-4 md:p-6 lg:p-8 w-full max-w-7xl">
				<h1 className="text-2xl md:text-3xl lg:text-4xl text-center mb-6 text-gray-800">
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
									allowedTypes={["jpg", "jpeg", "png", "webp"]}
									maxFileSize={5000000}
									showFileInfo={true}
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
									<InputField
										id="titulo"
										label="Título"
										placeholder="Insira o título do Livro"
										required
										error={errors.titulo?.message}
										{...register("titulo")}
									/>
								</div>

								{/* Descricao - ocupa linha inteira */}
								<div className="md:col-span-2">
									<TextArea
										id="descricao"
										label="Descrição"
										placeholder="Insira a descrição do Livro"
										maxLength={5000}
										showCharacterCount={true}
										required
										error={errors.sinopse?.message}
										{...register("sinopse")}
									/>
								</div>

								{/* Preço */}
								<CurrencyField
									id="preco"
									name="preco"
									label="Preço"
									control={control}
									error={errors.preco?.message}
									required
									helperText="Valor em reais (R$)"
								/>

								{/* Desconto */}
								<PercentField
									id="desconto"
									name="desconto"
									label="Desconto"
									control={control}
									error={errors.desconto?.message}
									required
									helperText="Valor em porcentagem (%)"
								/>

								{/* ISBN-10 */}
								<PatternField
									id="isbn10"
									name="isbn10"
									label="ISBN-10"
									required
									control={control}
									error={errors.isbn10?.message}
									pattern="###-#-#####-#"
									placeholder="000-0-00000-0"
									helperText="Formato: 000-0-00000-0"
								/>

								{/* ISBN-13 */}
								<PatternField
									id="isbn13"
									name="isbn13"
									label="ISBN-13"
									required
									control={control}
									error={errors.isbn13?.message}
									pattern="###-#-#####-####"
									placeholder="000-0-00000-0000"
									helperText="Formato: 000-0-00000-0000"
								/>

								{/* Número de Páginas */}
								<InputField
									id="paginas"
									label="Número de páginas"
									placeholder="Insira o nº de páginas do Livro"
									error={errors.paginas?.message}
									{...register("paginas")}
								/>

								{/* Ano de Publicação */}
								<InputField
									id="anoPublicacao"
									label="Ano de Publicação"
									placeholder="Insira o ano de publicação"
									error={errors.anoPublicacao?.message}
									{...register("anoPublicacao")}
								/>

								{/* Edição */}
								<InputField
									id="edicao"
									label="Edição"
									placeholder="Insira o número da edição"
									error={errors.edicao?.message}
									{...register("edicao")}
								/>

								{/* Idioma */}
								<SelectField
									id="idioma"
									label="Idioma"
									options={[
										{ id: "Português", label: "Português" },
										{ id: "Inglês", label: "Inglês" },
										{ id: "Espanhol", label: "Espanhol" },
										{ id: "Francês", label: "Francês" },
										{ id: "Alemão", label: "Alemão" },
										{ id: "Italiano", label: "Italiano" },
										{ id: "Outros", label: "Outros" }
									]}
									value={formValues.idioma || ""}
									onChange={(e) => setValue("idioma", e.target.value)}
									error={errors.idioma?.message}
									placeholder="Selecione o idioma"
									required
								/>

								{/* Categoria */}
								<SelectField
									id="categoria"
									label="Categoria"
									options={categoriasOptions}
									value={formValues.categoria?.id || ""}
									onChange={handleCategoriaChange}
									error={errors.categoria?.id?.message}
									placeholder="Selecione uma Categoria"
									required
								/>

								{/* Editora */}
								<SelectField
									id="editora"
									label="Editora"
									options={editorasOptions}
									value={formValues.editora?.id || ""}
									onChange={handleEditoraChange}
									error={errors.editora?.id?.message}
									placeholder="Selecione uma Editora"
									required
								/>
							</div>

							{/* Seção de Autores */}
							<div className="mb-6">
								<TagInput
									label="Autores"
									itensDisponiveis={availableAutores}
									itensSelecionados={selectedAutores}
									setItensSelecionados={setSelectedAutores}
									getNome={(autor) => autor.nome}
									getId={(autor) => autor.id}
									errors={errors.autores}
								/>
							</div>
						</div>
					</div>

					{/* Botão de Submissão - na largura total */}
					<div className="mt-8 flex justify-center gap-4">
						<Button
							type="submit"
							isLoading={isLoading}
							size="full"
							className="md:w-1/3 lg:w-1/4"
						>
							{id !== undefined ? "Atualizar" : "Cadastrar"}
						</Button>

						<Button
							type="reset"
							variant="danger"
							size="full"
							className="md:w-1/3 lg:w-1/4"
							onClick={retornar}
						>
							Cancelar
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default FormProduto

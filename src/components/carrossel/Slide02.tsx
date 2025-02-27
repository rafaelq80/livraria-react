function Slide02() {
	return (
		<div className="flex justify-center items-center max-h-[70vh] bg-gradient-to-r from-purple-900 to-purple-500">
			<div className="grid grid-cols-3 text-white">
				<div className="col-span-2 flex flex-col gap-6 items-center justify-center py-4">
					<h2 className="text-6xl font-bold">PRÉ VENDA</h2>
					<h3 className="text-4xl font-bold text-yellow-600 text-center text-pretty">
						O QUINTO LIVRO DA SAGA JOGOS VORAZES
					</h3>
					<p className="text-2xl font-bold text-white text-center">
						LANÇAMENTO MUNDIAL 18 DE MARÇO
					</p>
				</div>

				<div className="col-span-1 flex justify-center items-center">
					<img
						src="https://ik.imagekit.io/vzr6ryejm/livraria/livro_01.png?updatedAt=1740638889617"
						alt="Imagem Página Home"
						className="h-2/4"
					/>
				</div>

			</div>
		</div>
	)
}

export default Slide02

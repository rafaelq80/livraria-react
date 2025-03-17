function Slide02() {
	return (
		<div className="flex justify-center items-center md:max-h-[70vh] min-h-[50vh] bg-gradient-to-r from-purple-900 to-purple-500">
			<div className="flex flex-col text-white md:grid md:grid-cols-3">
				<div className="flex flex-col items-center justify-center col-span-2 gap-2 py-2 md:gap-6 md:py-4">
					<h2 className="hidden font-bold md:text-6xl">PRÉ VENDA</h2>
					<h3 className="text-2xl font-bold text-center text-yellow-600 md:text-4xl text-pretty">
						O QUINTO LIVRO DA SAGA JOGOS VORAZES
					</h3>
					<p className="text-base font-bold text-center text-white md:text-2xl">
						LANÇAMENTO MUNDIAL 18 DE MARÇO
					</p>
				</div>

				<div className="flex items-center justify-center col-span-1">
					<img
						src="https://ik.imagekit.io/vzr6ryejm/livraria/livro_01.png?updatedAt=1740638889617"
						alt="Imagem Página Home"
						className="md:h-2/4 h-[28vh] object-contain"
					/>
				</div>

			</div>
		</div>
	)
}

export default Slide02

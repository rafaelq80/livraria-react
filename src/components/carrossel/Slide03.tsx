function Slide03() {
	return (
		<div className="flex justify-center items-center md:h-[70vh] min-h-[50vh] bg-gradient-to-r from-amber-200 to-yellow-400">
			<div className="flex flex-col text-white md:grid md:grid-cols-4">
				<div className="items-center justify-center hidden md:col-span-1 md:flex">
					<img
						src="https://ik.imagekit.io/vzr6ryejm/livraria/murdle.png?updatedAt=1740641711413"
						alt="Imagem Página Home"
						className="h-2/3"
					/>
				</div>

				<div className="flex flex-col items-center justify-center col-span-2 gap-2 py-4 md:gap-6">
					<h3 className="text-2xl font-bold text-center text-white md:text-4xl font-outline-2 text-pretty">
						O BEST-SELLER MUNDIAL, <br />
						AGORA PARA JOVENS DETETIVES
					</h3>
				</div>

				<div className="flex items-center justify-center col-span-1">
					<img
						src="https://ik.imagekit.io/vzr6ryejm/livraria/livro_02.png?updatedAt=1740641041819"
						alt="Imagem Página Home"
						className="md:h-2/3 h-[28vh] object-contain"
					/>
				</div>
			</div>
		</div>
	)
}

export default Slide03

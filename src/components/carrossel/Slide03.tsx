function Slide03() {
	return (
		<div className="flex justify-center items-center min-h-[70vh] bg-gradient-to-r from-amber-200 to-yellow-400">
			<div className="grid grid-cols-4 text-white">
				<div className="col-span-1 flex justify-center items-center">
					<img
						src="https://ik.imagekit.io/vzr6ryejm/livraria/murdle.png?updatedAt=1740641711413"
						alt="Imagem Página Home"
						className="h-2/3"
					/>
				</div>

				<div className="col-span-2 flex flex-col gap-6 items-center justify-center py-4">
					<h3 className="text-4xl font-bold text-white font-outline-2 text-center text-pretty">
						O BEST-SELLER MUNDIAL, <br />
						AGORA PARA JOVENS DETETIVES
					</h3>
				</div>

				<div className="col-span-1 flex justify-center items-center">
					<img
						src="https://ik.imagekit.io/vzr6ryejm/livraria/livro_02.png?updatedAt=1740641041819"
						alt="Imagem Página Home"
						className="h-2/3"
					/>
				</div>
			</div>
		</div>
	)
}

export default Slide03

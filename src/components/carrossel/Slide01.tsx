function Slide01() {
	return (
		<div className="flex justify-center items-center md:min-h-[70vh] bg-indigo-900 min-h-[50vh]">
			<div className="flex flex-col-reverse text-white md:grid md:grid-cols-2">
				<div className="flex flex-col items-center justify-center gap-2 py-4 md:gap-6">
					<h2 className="text-3xl font-bold md:text-6xl">Seja bem vinde!</h2>
					<p className="text-base md:text-2xl">Aqui você encontra os melhores Livros!</p>
				</div>

				<div className="flex items-center justify-center">
					<img
						src="https://ik.imagekit.io/vzr6ryejm/livraria/home.png?updatedAt=1740642256938"
						alt="Imagem Página Home"
						className="md:h-2/3 h-[30vh] object-contain"
					/>
				</div>
			</div>
		</div>
	)
}

export default Slide01

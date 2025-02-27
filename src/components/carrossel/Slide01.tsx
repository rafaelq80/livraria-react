function Slide01() {
	return (
		<div className="flex justify-center items-center min-h-[70vh] bg-indigo-900">
			<div className="grid grid-cols-2 text-white">
				<div className="flex flex-col gap-6 items-center justify-center py-4">
					<h2 className="text-6xl font-bold">Seja bem vinde!</h2>
					<p className="text-2xl">Aqui você encontra os melhores Livros!</p>
				</div>

				<div className="flex justify-center items-center">
					<img
						src="https://ik.imagekit.io/vzr6ryejm/livraria/home.png?updatedAt=1740642256938"
						alt="Imagem Página Home"
						className="h-2/3"
					/>
				</div>
			</div>
		</div>
	)
}

export default Slide01

import {
	EnvelopeSimple,
	FacebookLogo,
	InstagramLogo,
	LinkedinLogo,
	MapPin,
	Phone,
	YoutubeLogo,
} from "@phosphor-icons/react"

function Footer() {
	const data = new Date().getFullYear()

	return (
		<footer className="bg-indigo-900 text-white py-8">
			<div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
				{/* Seção Sobre */}
				<div>
					<h2 className="text-xl font-semibold mb-4">Sobre o Projeto Livraria</h2>
					<p className="text-gray-300">
						Sua melhor escolha para livros de todos os gêneros. Encontre clássicos,
						lançamentos e muito mais.
					</p>
				</div>

				{/* Seção Links Rápidos */}
				<div>
					<h2 className="text-xl font-semibold mb-4">Links Rápidos</h2>
					<ul className="space-y-2">
						<li>
							<a href="#" className="text-gray-300 hover:text-white">
								Início
							</a>
						</li>
						<li>
							<a href="#" className="text-gray-300 hover:text-white">
								Catálogo
							</a>
						</li>
						<li>
							<a href="#" className="text-gray-300 hover:text-white">
								Promoções
							</a>
						</li>
						<li>
							<a href="#" className="text-gray-300 hover:text-white">
								Contato
							</a>
						</li>
					</ul>
				</div>

				{/* Seção Contato */}
				<div>
					<h2 className="text-xl font-semibold mb-4">Contato</h2>
					<div className="text-gray-300 flex gap-2 py-2">
						<MapPin size={28} weight="bold" color="#ffffff" /> Rua dos Livros, 123 - São
						Paulo, SP
					</div>
					<div className="text-gray-300 flex gap-2 py-2">
						<Phone size={28} weight="bold" color="#ffffff" /> (11) 98765-4321
					</div>
					<div className="text-gray-300 flex gap-2 py-2">
						<EnvelopeSimple size={28} weight="bold" color="#ffffff" />{" "}
						contato@livraria.com
					</div>
				</div>
			</div>

			{/* Seção Redes Sociais */}
			<div className="mt-8 text-center">
				<h2 className="text-xl font-semibold mb-4">Siga-nos</h2>
				<div className="flex justify-center space-x-4">
					<a href="#" target="_blank">
						<LinkedinLogo size={32} weight="bold" />
					</a>
					<a href="#" target="_blank">
						<InstagramLogo size={32} weight="bold" />
					</a>
					<a href="#" target="_blank">
						<FacebookLogo size={32} weight="bold" />
					</a>
					<a href="#" target="_blank">
						<YoutubeLogo size={32} weight="bold" />
					</a>
				</div>
			</div>

			{/* Direitos Autorais */}
			<div className="border-t border-gray-300 mt-8 pt-4 text-center text-gray-300 text-sm">
				&copy; {data} Projeto Livraria. Todos os direitos reservados.
			</div>
		</footer>
	)
}

export default Footer

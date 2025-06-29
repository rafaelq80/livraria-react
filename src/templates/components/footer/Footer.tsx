import {
	CaretDownIcon,
	EnvelopeSimpleIcon,
	FacebookLogoIcon,
	InstagramLogoIcon,
	LinkedinLogoIcon,
	MapPinIcon,
	PhoneIcon,
	YoutubeLogoIcon
} from "@phosphor-icons/react"
import { useState } from "react"

function Footer() {
	const [activeAccordion, setActiveAccordion] = useState<string | null>(null)
	const data = new Date().getFullYear()

	const toggleAccordion = (section: string) => {
		setActiveAccordion(activeAccordion === section ? null : section)
	}

	return (
		<footer className="bg-indigo-900 text-white py-8">
			<div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-2">
				{/* Seção Sobre - Mobile Accordion */}
				<div className="block md:hidden">
					<div className="">
						<button
							onClick={() => toggleAccordion("sobre")}
							className="w-full flex justify-between items-center py-2 text-xl font-semibold"
						>
							Sobre o Projeto Livraria
							<CaretDownIcon
								size={20}
								className={`transition-transform duration-300 ${
									activeAccordion === "sobre" ? "rotate-180" : ""
								}`}
							/>
						</button>
						{activeAccordion === "sobre" && (
							<div className="pb-4">
								<p className="text-gray-300">
									Sua melhor escolha para livros de todos os gêneros. Encontre
									clássicos, lançamentos e muito mais.
								</p>
							</div>
						)}
					</div>
				</div>

				{/* Seção Sobre - Desktop */}
				<div className="hidden md:block text-center md:text-left">
					<h2 className="text-xl font-semibold mb-4">Sobre o Projeto Livraria</h2>
					<p className="text-gray-300">
						Sua melhor escolha para livros de todos os gêneros. Encontre clássicos,
						lançamentos e muito mais.
					</p>
				</div>

				{/* Seção Links Rápidos - Mobile Accordion */}
				<div className="block md:hidden">
					<div className="">
						<button
							onClick={() => toggleAccordion("links")}
							className="w-full flex justify-between items-center py-2 text-xl font-semibold"
						>
							Links Rápidos
							<CaretDownIcon
								size={20}
								className={`transition-transform duration-300 ${
									activeAccordion === "links" ? "rotate-180" : ""
								}`}
							/>
						</button>
						{activeAccordion === "links" && (
							<div className="pb-4">
								<ul className="space-y-2">
									<li>
										<a href="/home" className="text-gray-300 hover:text-white">
											Início
										</a>
									</li>
									<li>
										<a href="/catalogo" className="text-gray-300 hover:text-white">
											Catálogo
										</a>
									</li>
									<li>
										<a href="/promocoes" className="text-gray-300 hover:text-white">
											Promoções
										</a>
									</li>
									<li>
										<a href="/contato" className="text-gray-300 hover:text-white">
											Contato
										</a>
									</li>
								</ul>
							</div>
						)}
					</div>
				</div>

				{/* Seção Links Rápidos - Desktop */}
				<div className="hidden md:block text-center md:text-left">
					<h2 className="text-xl font-semibold mb-4">Links Rápidos</h2>
					<ul className="space-y-2">
						<li>
							<a href="/home" className="text-gray-300 hover:text-white">
								Início
							</a>
						</li>
						<li>
							<a href="/catalogo" className="text-gray-300 hover:text-white">
								Catálogo
							</a>
						</li>
						<li>
							<a href="/promocoes" className="text-gray-300 hover:text-white">
								Promoções
							</a>
						</li>
						<li>
							<a href="/contato" className="text-gray-300 hover:text-white">
								Contato
							</a>
						</li>
					</ul>
				</div>

				{/* Seção Contato - Mobile Accordion */}
				<div className="block md:hidden">
					<div className="">
						<button
							onClick={() => toggleAccordion("contato")}
							className="w-full flex justify-between items-center py-2 text-xl font-semibold"
						>
							Contato
							<CaretDownIcon
								size={20}
								className={`transition-transform duration-300 ${
									activeAccordion === "contato" ? "rotate-180" : ""
								}`}
							/>
						</button>
						{activeAccordion === "contato" && (
							<div className="pb-4 space-y-2">
								<div className="text-gray-300 flex gap-2 items-center">
									<MapPinIcon size={28} weight="bold" color="#ffffff" /> Rua dos
									Livros, 123 - São Paulo, SP
								</div>
								<div className="text-gray-300 flex gap-2 items-center">
									<PhoneIcon size={28} weight="bold" color="#ffffff" /> (11)
									98765-4321
								</div>
								<div className="text-gray-300 flex gap-2 items-center">
									<EnvelopeSimpleIcon size={28} weight="bold" color="#ffffff" />{" "}
									contato@livraria.com
								</div>
							</div>
						)}
					</div>
				</div>

				{/* Seção Contato - Desktop */}
				<div className="hidden md:block text-center md:text-left">
					<h2 className="text-xl font-semibold mb-4">Contato</h2>
					<div className="text-gray-300 flex justify-center md:justify-start gap-2 py-2">
						<MapPinIcon size={28} weight="bold" color="#ffffff" /> Rua dos Livros, 123 - São
						Paulo, SP
					</div>
					<div className="text-gray-300 flex justify-center md:justify-start gap-2 py-2">
						<PhoneIcon size={28} weight="bold" color="#ffffff" /> (11) 98765-4321
					</div>
					<div className="text-gray-300 flex justify-center md:justify-start gap-2 py-2">
						<EnvelopeSimpleIcon size={28} weight="bold" color="#ffffff" />{" "}
						contato@livraria.com
					</div>
				</div>
			</div>

			{/* Seção Redes Sociais */}
			<div className="mt-8 text-center">
				<h2 className="text-xl font-semibold mb-4">Siga-nos</h2>
				<div className="flex justify-center space-x-4">
					<a href="/linkedin" target="_blank" className="hover:opacity-75 transition-opacity">
						<LinkedinLogoIcon size={32} weight="bold" />
					</a>
					<a href="/instagram" target="_blank" className="hover:opacity-75 transition-opacity">
						<InstagramLogoIcon size={32} weight="bold" />
					</a>
					<a href="/facebook" target="_blank" className="hover:opacity-75 transition-opacity">
						<FacebookLogoIcon size={32} weight="bold" />
					</a>
					<a href="/youtube" target="_blank" className="hover:opacity-75 transition-opacity">
						<YoutubeLogoIcon size={32} weight="bold" />
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

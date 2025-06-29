import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel from "embla-carousel-react"
import { useEffect, useState } from "react"
import Slide01 from "./Slide01"
import Slide02 from "./Slide02"
import Slide03 from "./Slide03"
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react"
import Button from "../ui/Button"

/**
 * Componente de carrossel responsivo com funcionalidades de:
 * - Autoplay automático a cada 5 segundos
 * - Navegação manual com botões (anterior/próximo)
 * - Paginação com dots indicadores
 * - Loop infinito
 * - Controles que aparecem no hover
 * - Layout responsivo (mobile/desktop)
 */
function Carrossel() {

	// Inicializa o Carrossel com configurações do Embla
	const [emblaRef, emblaApi] = useEmblaCarousel(
		{
			loop: true, // Exibe os slides infinitamente
			align: "start", // Alinha os slides à esquerda
			slidesToScroll: 1, // Permite rolagem de um slide por vez
		},

		// Plugin de autoplay: avança automaticamente a cada 5s, sem parar ao interagir
		[Autoplay({ delay: 5000, stopOnInteraction: false })]
	)

	// Armazena o índice do slide atual
	const [selectedIndex, setSelectedIndex] = useState(0) 
	
	// Armazena o número total de slides
	const [slidesCount, setSlidesCount] = useState(0)

	/**
	 * Efeito que gerencia os eventos do carrossel
	 * Atualiza o índice atual e o total de slides quando o carrossel é inicializado
	 */
	useEffect(() => {
		if (!emblaApi) return

		/**
		 * Atualiza o índice do slide atual
		 * Chamada sempre que o slide muda
		 */
		const updateIndex = () => {
			setSelectedIndex(emblaApi.selectedScrollSnap()) 
		}

		// Define o número total de slides
		setSlidesCount(emblaApi.scrollSnapList().length)

		// Registra o evento para troca de slide
		emblaApi.on("select", updateIndex)

		// Atualiza o índice inicial do slide atual
		updateIndex()

		// Cleanup: remove o evento ao desmontar o componente
		return () => {
			emblaApi.off("select", updateIndex)
		}
	}, [emblaApi])

	/**
	 * Navega para um slide específico ao clicar no dot correspondente
	 * @param index Índice do slide para navegar
	 */
	function scrollTo(index: number) {
		emblaApi?.scrollTo(index)
	}

	/**
	 * Navega para o slide anterior
	 */
	function scrollPrev() {
		emblaApi?.scrollPrev()
	}

	/**
	 * Navega para o próximo slide
	 */
	function scrollNext() {
		emblaApi?.scrollNext()
	}

	return (
		<div className="relative md:max-h-[70vh] max-h-[50vh]">
			{/* 
				Container principal do carrossel
				
				A propriedade ref={emblaRef} indica que o container
				<div> será controlado pelo Embla Carousel
				
				A classe "group" permite usar group-hover nos botões
			*/}
			<div 
				className="overflow-hidden group" 
				ref={emblaRef}
			>
				{/* Container dos slides */}
				<div className="flex flex-cols">
					{/* Slide 1 */}
					<div className="flex-[0_0_100%]">
						<article className="overflow-hidden max-h-[70vh] flex flex-col">
							<Slide01 />
						</article>
					</div>
					
					{/* Slide 2 */}
					<div className="flex-[0_0_100%]">
						<article className="overflow-hidden max-h-[70vh] flex flex-col">
							<Slide02 />
						</article>
					</div>
					
					{/* Slide 3 */}
					<div className="flex-[0_0_100%]">
						<article className="overflow-hidden max-h-[70vh] flex flex-col">
							<Slide03 />
						</article>
					</div>
				</div>
			</div>

			{/* Botões de Navegação - Anterior e Próximo */}
			{/* Botão Anterior */}
			<Button
				variant="ghost"
				size="lg"
				className="cursor-pointer hidden md:flex items-center justify-center w-16 h-16 absolute left-3 top-1/2 -translate-y-1/2 z-10 transition-opacity opacity-0 group-hover:opacity-100 bg-transparent hover:bg-transparent"
				onClick={scrollPrev}
				aria-label="Slide anterior"
			>
				<CaretLeftIcon size={48} className="fill-white stroke-slate-900 drop-shadow-xl" />
			</Button>

			{/* Botão Próximo */}
			<Button
				variant="ghost"
				size="lg"
				className="cursor-pointer hidden md:flex items-center justify-center w-16 h-16 absolute right-3 top-1/2 -translate-y-1/2 z-10 transition-opacity opacity-0 group-hover:opacity-100 bg-transparent hover:bg-transparent"
				onClick={scrollNext}
				aria-label="Próximo slide"
			>
				<CaretRightIcon size={48} className="fill-white stroke-slate-900 drop-shadow-xl" />
			</Button>

			{/* Paginação (Dots) - Indicadores de slide */}
			<div className="absolute flex gap-2 -translate-x-1/2 bottom-4 left-1/2">
				{[...Array(slidesCount)].map((_, index) => (
					<Button
						key={`carousel-dot-${index + 1}`}
						variant="ghost"
						size="sm"
						className={`cursor-pointer w-2 h-2 md:w-3 md:h-3 rounded-full transition-all p-0 ${
							selectedIndex === index ? "bg-white scale-125" : "bg-gray-400"
						}`}
						onClick={() => scrollTo(index)}
						aria-label={`Ir para slide ${index + 1}`}
						aria-current={selectedIndex === index ? "true" : "false"}
					/>
				))}
			</div>
		</div>
	)
}

export default Carrossel

import { CaretLeft, CaretRight } from "@phosphor-icons/react"
import useEmblaCarousel from "embla-carousel-react"
import Slide01 from "./Slide01"
import Autoplay from "embla-carousel-autoplay"
import { useState, useEffect } from "react"
import Slide02 from "./Slide02"
import Slide03 from "./Slide03"

function Carrossel() {
	const [emblaRef, emblaApi] = useEmblaCarousel(
		{
			loop: true,
			align: "start",
			slidesToScroll: 1,
		},
		[Autoplay({ delay: 5000, stopOnInteraction: false })]
	)

	const [selectedIndex, setSelectedIndex] = useState(0)
	const [slidesCount, setSlidesCount] = useState(0)
	const [showButtons, setShowButtons] = useState(false) // Estado para mostrar/ocultar botões

	// Atualiza os dots quando o slide muda
	useEffect(() => {
		if (!emblaApi) return

		const updateIndex = () => {
			setSelectedIndex(emblaApi.selectedScrollSnap())
		}

		setSlidesCount(emblaApi.scrollSnapList().length)
		emblaApi.on("select", updateIndex)
		updateIndex()

		return () => {
			emblaApi.off("select", updateIndex)
		}
	}, [emblaApi])

	// Função para ir para um slide específico ao clicar no dot
	function scrollTo(index: number) {
		emblaApi?.scrollTo(index)
	}

	// Função para ir para o slide anterior em relação ao atual
	function scrollPrev() {
		emblaApi?.scrollPrev()
	}

	// Função para ir para o próximo slide em relação ao atual
	function scrollNext() {
		emblaApi?.scrollNext()
	}

	return (
		<section
			className="relative md:max-h-[70vh] max-h-[50vh]"
			onMouseEnter={() => setShowButtons(true)}
			onMouseLeave={() => setShowButtons(false)}
		>
			<div className="overflow-hidden" ref={emblaRef}>
				<div className="flex flex-cols">
					<div className="flex-[0_0_100%]">
						<article className="overflow-hidden max-h-[70vh] flex flex-col">
							<Slide01 />
						</article>
					</div>
					<div className="flex-[0_0_100%]">
						<article className="overflow-hidden max-h-[70vh] flex flex-col">
							<Slide02 />
						</article>
					</div>
					<div className="flex-[0_0_100%]">
						<article className="overflow-hidden max-h-[70vh] flex flex-col">
							<Slide03 />
						</article>
					</div>
				</div>
			</div>

			<button
				className={`cursor-pointer hidden md:flex items-center justify-center w-16 h-16 absolute left-3 top-1/2 -translate-y-1/2 z-10 transition-opacity ${
					showButtons ? "opacity-100" : "opacity-0"
				}`}
				onClick={scrollPrev}
			>
				<CaretLeft size={48} className="fill-white stroke-slate-900 drop-shadow-xl" />
			</button>

			<button
				className={`cursor-pointer hidden md:flex items-center justify-center w-16 h-16 absolute right-3 top-1/2 -translate-y-1/2 z-10 transition-opacity ${
					showButtons ? "opacity-100" : "opacity-0"
				}`}
				onClick={scrollNext}
			>
				<CaretRight size={48} className="fill-white stroke-slate-900 drop-shadow-xl" />
			</button>

			{/* Paginação (Dots) */}
			<div className="absolute flex gap-2 -translate-x-1/2 bottom-4 left-1/2">
				{Array.from({ length: slidesCount }).map((_, index) => (
					<button
						key={index}
						className={`cursor-pointer w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
							selectedIndex === index ? "bg-white scale-125" : "bg-gray-400"
						}`}
						onClick={() => scrollTo(index)}
					/>
				))}
			</div>
		</section>
	)
}

export default Carrossel

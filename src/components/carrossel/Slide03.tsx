
function Carroussel03() {
    return (

        <div className="
                bg-yellow-400 
                flex 
                justify-center
                ">
            <div className='
                    container 
                    grid 
                    grid-cols-2 
                    text-slate-900
                    '>
                <div className="
                        flex 
                        flex-col 
                        gap-4 
                        items-center 
                        justify-center 
                        py-4
                        ">
                    <h2 className='
                            text-5xl 
                            font-bold
                            '>
                        Promoção de Periféricos!
                    </h2>
                    <p className='text-3xl'>Descontos de até 50%</p>
                </div>

                <div className="flex justify-center ">
                    <img
                        src="https://ik.imagekit.io/vzr6ryejm/games/perifericos.png?updatedAt=1714810226671"
                        alt="Imagem Página Home"
                        className='w-2/3'
                    />
                </div>
            </div>
        </div>
    )
}

export default Carroussel03

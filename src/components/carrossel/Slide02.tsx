
function Carroussel02() {
    return (

        <div className="
                flex 
                justify-center
                bg-[url('https://ik.imagekit.io/vzr6ryejm/games/bg_slide_02.png?updatedAt=1714810179695')]
                bg-repeat
                "
                >
            <div className='
                    container 
                    grid 
                    grid-cols-2 
                    text-white
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
                        Promoções Imperdíveis!
                    </h2>
                    <p className='text-3xl'>É na Madrugada dos Games!</p>

                </div>

                <div className="flex justify-center ">
                    <img
                        src="https://ik.imagekit.io/vzr6ryejm/games/logo_promocao.png?updatedAt=1714810126717"
                        alt="Imagem Página Home"
                        className='w-3/4'
                    />
                </div>
            </div>
        </div>
    )
}

export default Carroussel02


function Slide01() {
    return (

        <div className="bg-slate-800 flex justify-center">
            <div className="container grid grid-cols-2 text-white">
                <div className="flex flex-col gap-4 items-center justify-center py-4">
                    <h2 className="text-5xl font-bold">
                        Seja bem vinde!
                    </h2>
                    <p className="text-xl">Aqui você encontra os melhores Games!</p>

                </div>

                <div className="flex justify-center ">
                    <img
                        src="https://ik.imagekit.io/vzr6ryejm/games/home.png?updatedAt=1705970755605"
                        alt="Imagem Página Home"
                        className="w-2/3"
                    />
                </div>
            </div>
        </div>
    )
}

export default Slide01
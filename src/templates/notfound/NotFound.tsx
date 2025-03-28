import { useNavigate } from "react-router-dom"

function NotFound() {

	const navigate = useNavigate()

	const retornar = () => {
		navigate(-1)
	}

	return (
		<div className="flex flex-col justify-center items-center h-[80vh] gap-8 bg-indigo-400">
			<h1 className="text-white font-bold text-3xl">Página não encontrada!</h1>
            <img
				src="https://ik.imagekit.io/vzr6ryejm/not_found.png?updatedAt=1743014788556"
				alt="Not Found"
                className="w-1/3"
			/>
			
				<button 
					className="bg-indigo-900 hover:bg-indigo-700 cursor-pointer font-bold text-white py-2 px-4 rounded"
					onClick={retornar}
				>
                    Home
                </button>
			
		</div>
	)
}

export default NotFound

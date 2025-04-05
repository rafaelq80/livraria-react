import { useNavigate } from "react-router-dom"

function NotFound() {

	const navigate = useNavigate()

	const retornar = () => {
		navigate("/")
	}

	return (
		<div className="flex flex-col justify-center items-center h-[80vh] gap-4 bg-indigo-400">
			<h1 className="text-white font-bold text-9xl">403</h1>
			<h2 className="text-white font-bold text-3xl">Forbidden</h2>
			<h3 className="text-white text-2xl">Acesso Negado!</h3>

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

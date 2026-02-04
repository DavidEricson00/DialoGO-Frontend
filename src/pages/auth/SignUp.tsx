import { useState } from "react"
import { createUser } from "../../services/user.service"
import { useNavigate } from "react-router-dom"


export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false)
    const [showRepeatPassword, setShowRepeatPassword] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    async function handleSignUp(e: React.FormEvent) {
        e.preventDefault()
        try {
            await createUser({
                username: username,
                password: password
            })
            
            navigate("/login", {replace: true})

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-white font-sans text-zinc-900">
        <div className="flex flex-col justify-center items-center w-full md:w-[40%] p-8 lg:p-16">
            <div className="w-full max-w-sm">
            <header className="mb-5">
                <h1 className="text-4xl font-black tracking-tighter mb-8 text-zinc-950">
                Dialo<span className="text-blue-600">GO</span>
                </h1>
                <h2 className="text-3xl font-bold mb-2">Cadastro</h2>
                <p className="text-zinc-500">Cadastre sua conta para entrar na plataforma</p>
            </header>

            <form className="flex flex-col gap-5" onSubmit={handleSignUp}>
                <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-700">Usuário</label>
                <input 
                    value={username || ""}
                    onChange={e => setUsername(e.target.value)}
                    type="text" 
                    className="w-full border border-zinc-300 rounded-lg px-4 py-2.5 bg-zinc-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-zinc-700 flex items-center justify-between">
                    Senha
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="text-xs font-semibold text-blue-600 hover:underline underline-offset-4 cursor-pointer"
                    >
                        {showPassword ? "Ocultar" : "Ver"}
                    </button>
                    </label>
                    <input
                    value={password || ""}
                    onChange={e => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    className="w-full border border-zinc-300 rounded-lg px-4 py-2.5 bg-zinc-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                    />
                </div>

                
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-zinc-700 flex items-center justify-between">
                    Repetir Senha
                    <button
                        type="button"
                        onClick={() => setShowRepeatPassword((prev) => !prev)}
                        className="text-xs font-semibold text-blue-600 hover:underline underline-offset-4 cursor-pointer"
                    >
                        {showRepeatPassword ? "Ocultar" : "Ver"}
                    </button>
                    </label>
                    <input
                    type={showRepeatPassword ? "text" : "password"}
                    className="w-full border border-zinc-300 rounded-lg px-4 py-2.5 bg-zinc-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                    />
                </div>

                <input 
                type="submit" 
                value="Criar conta" 
                className="mt-4 bg-zinc-900 text-white rounded-lg py-3 font-semibold hover:bg-zinc-800 active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-zinc-200"
                />
            </form>

            <footer className="mt-12 text-center">
                <p className="text-zinc-600">
                Já possui uma conta? faça{" "}
                <a 
                    className="text-blue-600 font-bold hover:underline underline-offset-4 decoration-2" 
                    href="/login"
                >
                    Login
                </a>
                </p>
            </footer>
            </div>
        </div>

        <div className="hidden md:flex w-[60%] bg-zinc-50 items-center justify-center overflow-hidden">
            <img 
            src="src/assets/hero.png" 
            alt="Hero" 
            className="w-full h-full object-cover select-none"
            />
        </div>
        </div>
    )
}
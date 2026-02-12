import { useState, useEffect } from "react"
import { createUser } from "../../services/user.service"
import { useNavigate } from "react-router-dom"

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false)
    const [showRepeatPassword, setShowRepeatPassword] = useState(false)
    
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [isFormValid, setIsFormValid] = useState(false)
    const [passwordTouched, setPasswordTouched] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const timer = setTimeout(() => {
            const isUserValid = username.length > 0 && username.length <= 20
            const isPassValid = password.length >= 8 && password.length <= 100
            const isMatch = password === confirmPassword
            
            setIsFormValid(isUserValid && isPassValid && isMatch)
        }, 500)

        return () => clearTimeout(timer)
    }, [username, password, confirmPassword])

    async function handleSignUp(e: React.FormEvent) {
        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            await createUser({
                username,
                password
            })

            navigate("/login", {
                replace: true,
                state: { success: "Usuário criado com sucesso!" }
            })

        } catch (error: any) {
            setLoading(false)
            setError(error.message || "Ocorreu um erro ao criar a conta.")
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

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg font-medium">
                            {error}
                        </div>
                    )}

                    <form className="flex flex-col gap-5" onSubmit={handleSignUp}>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-zinc-700">Usuário</label>
                            <input
                                value={username}
                                onChange={e => {
                                    if (e.target.value.length <= 20) setUsername(e.target.value)
                                }}
                                type="text"
                                placeholder="Máx. 20 caracteres"
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
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                type={showPassword ? "text" : "password"}
                                placeholder="Min. 8 caracteres"
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
                                value={confirmPassword}
                                onFocus={() => setPasswordTouched(true)}
                                onChange={e => setConfirmPassword(e.target.value)}
                                type={showRepeatPassword ? "text" : "password"}
                                className={`w-full border rounded-lg px-4 py-2.5 bg-zinc-50 focus:bg-white focus:ring-4 outline-none transition-all ${
                                    passwordTouched && confirmPassword && password !== confirmPassword 
                                    ? "border-red-300 focus:border-red-500 focus:ring-red-500/10" 
                                    : "border-zinc-300 focus:border-blue-500 focus:ring-blue-500/10"
                                }`}
                            />
                            {passwordTouched && confirmPassword && password !== confirmPassword && (
                                <span className="text-xs text-red-500 font-medium">As senhas não coincidem</span>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={!isFormValid || loading}
                            className="mt-4 flex items-center justify-center bg-zinc-900 text-white rounded-lg py-3 font-semibold hover:bg-zinc-800 active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Criando...
                                </span>
                            ) : (
                                "Criar conta"
                            )}
                        </button>
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
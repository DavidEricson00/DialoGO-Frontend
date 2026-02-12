import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    if (location.state?.success) {
      setSuccess(location.state.success);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(username, password);
      navigate("/home", { replace: true });
    } catch (error) {
      setError("Usuário ou senha incorretos.");
      setLoading(false);
    }
  }

  const isFormValid = username.trim() !== "" && password.trim() !== "";

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white font-sans text-zinc-900">
      <div className="flex flex-col justify-center items-center w-full md:w-[40%] p-8 lg:p-16">
        <div className="w-full max-w-sm">
          <header className="mb-5">
            <h1 className="text-4xl font-black tracking-tighter mb-8 text-zinc-950">
              Dialo<span className="text-blue-600">GO</span>
            </h1>
            <h2 className="text-3xl font-bold mb-2">Login</h2>
            <p className="text-zinc-500">Faça login para acessar sua conta</p>
          </header>

          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 text-sm rounded-lg font-medium">
              {success}
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg font-medium">
              {error}
            </div>
          )}

          <form className="flex flex-col gap-5" onSubmit={handleLogin}>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-zinc-700">Usuário</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                className="w-full border border-zinc-300 rounded-lg px-4 py-2.5 bg-zinc-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={!isFormValid || loading}
              className="mt-4 flex items-center justify-center bg-zinc-900 text-white rounded-lg py-3 font-semibold hover:bg-zinc-800 active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Entrando...
                </span>
              ) : (
                "Entrar"
              )}
            </button>
          </form>

          <footer className="mt-12 text-center">
            <p className="text-zinc-600">
              Ainda não tem uma conta?{" "}
              <a
                className="text-blue-600 font-bold hover:underline underline-offset-4 decoration-2"
                href="/signup"
              >
                Cadastre-se
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
  );
}

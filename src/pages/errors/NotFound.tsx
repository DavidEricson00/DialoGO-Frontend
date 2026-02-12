import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="text-center">
        
        <h1 className="text-9xl font-black text-blue-600/20">404</h1>
        
        <div className="-mt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Página não encontrada</h2>
          <p className="text-gray-500 mb-8 max-w-xs mx-auto">
            Parece que a página que você estava procurando sumiu do mapa.
          </p>
          
          <button
            onClick={() => navigate("/")}
            className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95"
          >
            <ArrowLeft size={20} />
            Voltar para o início
          </button>
        </div>
      </div>
    </div>
  );
}
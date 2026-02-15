import { Lock, Settings2 } from "lucide-react";
import { GetChatsFilters } from "../../services/chat.service";

type SortDirection = "asc" | "desc";

type ChatFilterControllerProps = {
  hasPassword: boolean | undefined;
  sortBy: GetChatsFilters["order"];
  sortDirection: SortDirection;
  onSortChange: (sort: GetChatsFilters["order"]) => void;
  onSortDirectionChange: (direction: SortDirection) => void;
  onHasPasswordChange: (value: boolean | undefined) => void;
  applyFilters: () => void;
};

export default function ChatFilterController({
  hasPassword,
  sortBy,
  sortDirection,
  onSortChange,
  onSortDirectionChange,
  onHasPasswordChange,
  applyFilters,
}: ChatFilterControllerProps) {
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "true") onHasPasswordChange(true);
    else if (value === "false") onHasPasswordChange(false);
    else onHasPasswordChange(undefined);
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-4 w-full max-w-sm">
      <div className="flex items-center gap-2 mb-2 text-gray-800 font-semibold">
        <Settings2 size={18} />
        <h2>Filtros</h2>
      </div>

      <div className="flex flex-col">
        <span className="text-xs font-bold text-gray-500 uppercase mb-1 ml-1 flex items-center gap-1">
          <Lock
            size={12}
            className={hasPassword === true ? "text-blue-600" : "text-gray-400"}
          />
          Privacidade
        </span>
        <div className="relative">
          <select
            value={hasPassword === true ? "true" : hasPassword === false ? "false" : "all"}
            onChange={handlePasswordChange}
            className="appearance-none w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer"
          >
            <option value="all">Todos (Com e sem senha)</option>
            <option value="true">Apenas com senha</option>
            <option value="false">Apenas sem senha</option>
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-[10px]">
            ▼
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-gray-500 uppercase mb-1 ml-1">
            Ordenar por
          </span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) =>
                onSortChange(e.target.value as GetChatsFilters["order"])
              }
              className="appearance-none w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer"
            >
              <option value="created_at">Data de Criação</option>
              <option value="name">Nome</option>
              <option value="users_count">Usuários</option>
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-[10px]">
              ▼
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-xs font-bold text-gray-500 uppercase mb-1 ml-1">
            Direção
          </span>
          <div className="relative">
            <select
              value={sortDirection}
              onChange={(e) =>
                onSortDirectionChange(e.target.value as SortDirection)
              }
              className="appearance-none w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer"
            >
              <option value="asc">Crescente</option>
              <option value="desc">Decrescente</option>
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-[10px]">
              ▼
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={applyFilters}
        className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-all shadow-md active:scale-[0.98] mt-2"
      >
        Aplicar Filtros
      </button>
    </div>
  );
}
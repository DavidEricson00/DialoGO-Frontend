import { Lock, Settings2 } from "lucide-react";

type SortOption = "date" | "name" | "users";
type SortDirection = "asc" | "desc";

type ChatFilterControllerProps = {
  hasPassword: boolean;
  sortBy: SortOption;
  sortDirection: SortDirection;
  onSortChange: (sort: SortOption) => void;
  onSortDirectionChange: (direction: SortDirection) => void;
  onHasPasswordToggle: () => void;
  applyFilters: () => void;
};

export default function ChatFilterController({
  hasPassword,
  sortBy,
  sortDirection,
  onSortChange,
  onSortDirectionChange,
  onHasPasswordToggle,
  applyFilters,
}: ChatFilterControllerProps) {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-4 w-full max-w-sm">
      <div className="flex items-center gap-2 mb-2 text-gray-800 font-semibold">
        <Settings2 size={18} />
        <h2>Filtros</h2>
      </div>

      <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
        <label htmlFor="pass-toggle" className="text-sm font-medium flex items-center gap-2 cursor-pointer">
          <Lock size={14} className={hasPassword ? "text-blue-600" : "text-gray-400"} />
          Apenas com senha
        </label>
        <input
          id="pass-toggle"
          type="checkbox"
          checked={hasPassword}
          onChange={onHasPasswordToggle}
          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Ordenar por</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="appearance-none w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer"
            >
              <option value="date">Data</option>
              <option value="name">Nome</option>
              <option value="users">Usuários</option>
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-[10px]">
              ▼
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Direção</span>
          <div className="relative">
            <select
              value={sortDirection}
              onChange={(e) => onSortDirectionChange(e.target.value as SortDirection)}
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
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-all shadow-md active:scale-[0.98] mt-2"
      >
        Aplicar Filtros
      </button>
    </div>
  );
}
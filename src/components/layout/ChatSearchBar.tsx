import { Search, X } from "lucide-react";

type ChatSearchBatProps = {
  text: string;
  searchText: (text: string) => void;
  setSearchText: (text: string) => void;
  clearSearchBar: () => void;
};

export function ChatSearchBar({
  text,
  searchText,
  clearSearchBar,
  setSearchText,
}: ChatSearchBatProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    searchText(text);
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className="relative flex items-center group"
    >

      <div className="absolute left-3 text-gray-400 group-focus-within:text-blue-500 transition-colors">
        <Search size={18} />
      </div>

      <input
        value={text}
        type="text"
        placeholder="Nome do chat..."
        onChange={(e) => setSearchText(e.target.value)}
        className="w-full pl-10 pr-20 py-2 bg-gray-100 border border-transparent rounded-full 
                   focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                   outline-none transition-all duration-200 text-sm"
      />

      <div className="absolute right-2 flex items-center gap-1">
        {text && (
          <button
            type="button"
            onClick={clearSearchBar}
            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
            title="Limpar busca"
          >
            <X size={16} />
          </button>
        )}
        
        <button 
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer"
        >
          Buscar
        </button>
      </div>
    </form>
  );
}
import { useState } from "react";
import { ChatSearchBar } from "../../layout/ChatSearchBar";
import ChatFilterController from "../../layout/ChatFilterController";

type SortOption = "date" | "name";
type SortDirection = "asc" | "desc";

export default function ChatDiscoveryList() {
  const [text, setText] = useState("");

  const [hasPassword, setHasPassword] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");


  function searchText(text: string) {
    console.log(text);
  }

  function clearSearchBar() {
    setText("");
  }

  function applyFilters() {
    console.log("Aplicando filtros manuais...");
    searchText(text);
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row gap-6 items-start max-w-6xl mx-auto">
        
        <div className="flex-1 w-full">
          <ChatSearchBar
            text={text}
            searchText={searchText}
            setSearchText={setText}
            clearSearchBar={clearSearchBar}
          />
          
          <div className="mt-8 p-10 border-2 border-dashed border-gray-300 rounded-xl text-center text-gray-400">
            Os resultados do chat aparecerão aqui...
          </div>
        </div>

        <aside className="w-full md:w-80 shrink-0">
          <ChatFilterController
            hasPassword={hasPassword}
            sortBy={sortBy}
            sortDirection={sortDirection}
            onSortChange={setSortBy}
            onSortDirectionChange={setSortDirection}
            onHasPasswordToggle={() => setHasPassword(!hasPassword)}
            applyFilters={applyFilters}
          />
        </aside>

      </div>
    </div>
  );
}
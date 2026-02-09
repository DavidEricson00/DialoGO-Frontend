import { useState } from "react"
import { ChatSearchBar } from "../../layout/ChatSearchBar"

export default function ChatDiscoveryList() {
  const [text, setText] = useState("");

  function searchText(text: string) {
    console.log(text);
  }

  function clearSearchBar() {
    setText("");
  }

  return (
    <div className="border-black p-8">
        <div className="w-full">
            <ChatSearchBar 
            text={text}
            searchText={searchText}
            setSearchText={setText}
            clearSearchBar={clearSearchBar}
        />
        </div>

    </div>
  );
}

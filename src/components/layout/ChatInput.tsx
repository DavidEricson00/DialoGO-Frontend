import { Send } from "lucide-react";

type ChatInputProps = {
  text: string;
  onTextChange: (text: string) => void;
  sendText: (text: string) => void;
};

export default function ChatInput({
  text,
  onTextChange,
  sendText,
}: ChatInputProps) {
  
  const handleSend = () => {
    if (text.trim() === "") return;
    
    sendText(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 bg-white border-t border-gray-200 shrink-0">
      <div className="flex items-center gap-3 relative">
        <input
          type="text"
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite sua mensagem..."
          className="flex-1 bg-gray-100 hover:bg-gray-300/50 focus:bg-white border border-transparent focus:border-blue-300 rounded-full px-3 py-3 text-sm text-gray-700 outline-none transition-all placeholder:text-gray-400 shadow-inner"
        />
        
        <button
          onClick={handleSend}
          disabled={!text.trim()}
          className="flex items-center justify-center w-11 h-11 shrink-0 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full transition-colors shadow-md active:scale-95 cursor-pointer"
          title="Enviar mensagem"
        >
          <Send size={18} strokeWidth={2.5} className="ml-0.5 flex items-center justify-center" /> 
        </button>
      </div>
    </div>
  );
}
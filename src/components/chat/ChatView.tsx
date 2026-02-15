interface ChatViewProps {
  chatId: string;
  onBack: () => void;
}

export default function ChatView({ chatId, onBack }: ChatViewProps) {
  return (
    <div>
      <button 
        onClick={onBack}
        className="mb-4 text-blue-600"
      >
        ← Voltar
      </button>

      <h1>Tela do chat</h1>
      <p>ID do chat: {chatId}</p>
    </div>
  );
}

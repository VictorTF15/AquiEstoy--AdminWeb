"use client";

import { MessageCircle, X, Send, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

type Message = {
  id: string;
  sender: "user" | "bot";
  text: string;
  sources?: string[];
};

export function FloatingChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const initConversation = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_CHAT_URL;
      if (!apiUrl) {
        throw new Error("NEXT_PUBLIC_API_CHAT_URL no está definido");
      }

      const res = await fetch(`${apiUrl}/conversations/init`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ external_id: "string" }),
      });

      if (!res.ok) throw new Error("Error iniciando conversación");

      const data = await res.json();
      setConversationId(data.conversation_id);
      return data.conversation_id;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue;
    setInputValue("");
    
    // Agregamos el mensaje del usuario a la UI
    const tempId = Date.now().toString();
    setMessages((prev) => [...prev, { id: tempId, sender: "user", text: userText }]);
    setIsLoading(true);

    try {
      let currentConvId = conversationId;

      // 1. Iniciamos la conversación si no existe
      if (!currentConvId) {
        currentConvId = await initConversation();
        if (!currentConvId) throw new Error("No se pudo iniciar la conversación");
      }

      // 2. Enviamos el mensaje
      const apiUrl = process.env.NEXT_PUBLIC_API_CHAT_URL;
      const chatRes = await fetch(`${apiUrl}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pregunta: userText,
          usuario_id: 0,
          conversation_id: currentConvId,
        }),
      });

      if (!chatRes.ok) throw new Error("Error enviando mensaje al chatbot");

      const data = await chatRes.json();
      
      setMessages((prev) => [
        ...prev,
        {
          id: data.chat_id || Date.now().toString(),
          sender: "bot",
          text: data.respuesta,
          sources: data.fuentes,
        },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "bot",
          text: "Hubo un error de conexión con el Asistente. Por favor, revisa tu conexión o reintenta más tarde.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-80 sm:w-96 h-[500px] bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-indigo-600 p-4 text-white flex justify-between items-center shadow-md z-10">
              <div className="flex items-center gap-2">
                <Bot size={24} />
                <h3 className="font-semibold tracking-tight">Asistente Virtual</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:text-indigo-200 transition-colors p-1"
                aria-label="Cerrar chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Área de mensajes */}
            <div className="flex-1 p-4 overflow-y-auto bg-zinc-50 dark:bg-zinc-950 flex flex-col gap-4">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-zinc-500 text-center px-4">
                  <Bot size={48} className="text-zinc-300 mb-4" />
                  <p>¡Hola! Hazme cualquier pregunta, estoy aquí para ayudarte.</p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col max-w-[85%] ${
                      msg.sender === "user" ? "self-end items-end" : "self-start items-start"
                    }`}
                  >
                    <div
                      className={`px-4 py-2.5 rounded-2xl ${
                        msg.sender === "user"
                          ? "bg-indigo-600 text-white rounded-br-none"
                          : "bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 rounded-bl-none shadow-sm"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                    </div>
                    {/* Fuentes de Respuesta si existen */}
                    {msg.sender === "bot" && msg.sources && msg.sources.length > 0 && (
                      <div className="mt-2 ml-1 flex flex-wrap gap-1.5">
                        {msg.sources.map((source, idx) => (
                          <span
                            key={idx}
                            title={source}
                            className="text-[11px] bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-800/50 max-w-full truncate"
                          >
                            {source}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
              {/* Indicador de "Escribiendo..." */}
              {isLoading && (
                <div className="self-start bg-white dark:bg-zinc-800 px-4 py-3.5 rounded-2xl rounded-bl-none border border-zinc-200 dark:border-zinc-700 shadow-sm flex items-center gap-1.5 w-fit">
                  <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input para enviar mensaje */}
            <form
              onSubmit={handleSend}
              className="p-3 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Escribe tu mensaje..."
                className="flex-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm transition-all shadow-inner"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-zinc-300 dark:disabled:bg-zinc-700 disabled:cursor-not-allowed text-white w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors shadow-sm"
                aria-label="Enviar mensaje"
              >
                <Send size={18} className="translate-x-[1px] translate-y-[-1px]" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* El Botón Flotante */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-indigo-600 hover:bg-indigo-700 text-white w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-2xl shadow-indigo-500/40 transition-colors border border-indigo-500"
        aria-label="Alternar chatbot"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle size={28} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

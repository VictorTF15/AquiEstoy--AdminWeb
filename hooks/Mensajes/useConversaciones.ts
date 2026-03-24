import type { ConversacionBackend } from "@/types/conversaciones";

/**
 * Mock hook - useConversaciones
 * For legacy pages
 */
export function useConversaciones(): {
  conversaciones: ConversacionBackend[];
  data: ConversacionBackend[];
  obtenerOCrearChatParaCaso: (idCaso: number, idUsuario1: number, idUsuario2: number) => Promise<ConversacionBackend | null>;
  isLoading: boolean;
  error: string | null;
} {
  const obtenerOCrearChatParaCaso = async (_idCaso: number, _idUsuario1: number, _idUsuario2: number) => null;

  return {
    conversaciones: [],
    data: [],
    obtenerOCrearChatParaCaso,
    isLoading: false,
    error: null,
  };
}

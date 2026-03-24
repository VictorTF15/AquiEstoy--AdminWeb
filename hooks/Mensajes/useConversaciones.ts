import type { ConversacionBackend } from "@/types/conversaciones";

/**
 * Mock hook - useConversaciones
 * For legacy pages
 */
export function useConversaciones(): {
  conversaciones: ConversacionBackend[];
  data: ConversacionBackend[];
  isLoading: boolean;
  error: string | null;
} {
  return { conversaciones: [], data: [], isLoading: false, error: null };
}

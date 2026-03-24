import type { MensajeBackend, NuevoMensajePayload } from "@/types/mensajes";

/**
 * Mock hook - useMensajes
 * For legacy mensajes page
 */
export function useMensajes(_idConversacion?: number): {
  mensajes: MensajeBackend[];
  data: MensajeBackend[];
  isLoading: boolean;
  isEnviando: boolean;
  enviarMensaje: (payload: NuevoMensajePayload) => Promise<boolean>;
  error: string | null;
} {
  const enviarMensaje = async (_payload: NuevoMensajePayload) => true;
  return {
    mensajes: [],
    data: [],
    isLoading: false,
    isEnviando: false,
    enviarMensaje,
    error: null,
  };
}

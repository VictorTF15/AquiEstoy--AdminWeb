import type { Usuario } from '@/types/usuarios';

/**
 * Mock hook - usePerfil
 * For legacy pages
 */
export function usePerfil(): {
  perfil: Usuario | null;
  data: Usuario | null;
  isLoading: boolean;
  error: string | null;
} {
  return { perfil: null, data: null, isLoading: false, error: null };
}

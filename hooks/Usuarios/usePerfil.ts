type LegacyPerfil = {
  id: number;
  [key: string]: unknown;
};

/**
 * Mock hook - usePerfil
 * For legacy pages
 */
export function usePerfil(): {
  perfil: LegacyPerfil | null;
  data: LegacyPerfil | null;
  isLoading: boolean;
  error: string | null;
} {
  return { perfil: null, data: null, isLoading: false, error: null };
}
